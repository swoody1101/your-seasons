import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';

import { Box, Button, Grid, styled, Typography, ButtonGroup, IconButton, CircularProgress } from '@mui/material'
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';


import { settingModalOn, setSession, setCustomer, postConsultingResult } from 'features/consulting/consultingRoom/consultSlice'

import { CONSULTANT, CUSTOMER } from 'api/CustomConst'
import { sharedColorSet, changeComment, selectTone, setFiles } from 'common/colorset/colorSetSlice'

import Chat from 'features/consulting/consultingRoom/chat/Chat'
import ColorPalette from 'common/colorset/ColorPalette'
import SelectedColorSet from 'common/colorset/SelectedColorSet';
import ColorButtonGroup from 'common/colorset/ColorButtonGroup'

const OPENVIDU_SERVER_URL = 'https://yourseasons.anveloper.kr:8443';
const OPENVIDU_SERVER_SECRET = 'YOUR_SEASONS_SECRET';

// rafce Arrow function style 
const ConsultingRoom = () => {
  const { nickname, role, email, imageUrl } = useSelector(state => state.auth.logonUser)
  const { session, customer, consultingId, consultantSessionName } = useSelector(state => state.consult)
  const tmp = email.replace(/[@\.]/g, '-')
  const [mySessionId, setMySessionId] = useState(
    role === CONSULTANT ? tmp : consultantSessionName
  )

  const [isBest, setIsBest] = useState(false)
  const [isWorst, setIsWorst] = useState(false)

  const [myUserName, setMyUserName] = useState(nickname)

  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [consultant, setConsultant] = useState(undefined)
  const [streamManagers, setStreamManagers] = useState(undefined)

  const [testVideo, setTestVideo] = useState(undefined)

  const [OV, setOV] = useState(null)

  const [isMic, setIsMic] = useState(true)
  const [isCam, setIsCam] = useState(true)
  const { selectedColor, bestColor, worstColor } = useSelector(state => state.colorSetList)

  // 코멘트, 진단결과 톤, 진단결과 이미지 정보
  const comment = useSelector(state => state.colorSetList.comment)
  const selectedTone = useSelector(state => state.colorSetList.tone)
  const files = useSelector(state => state.colorSetList.files)
  const consultingFinishRequest = {
    consultingId: consultingId,
    comment: comment,
    tone: selectedTone,
    bestColorSet: bestColor,
    worstColorSet: worstColor
  }
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener(
      'beforeunload',
      onbeforeunload);
    return () => {
      window.removeEventListener(
        'beforeunload',
        onbeforeunload);
    }
  }, [])


  useEffect(() => {
    if (session) {
      session.on('streamCreated', streamCreated)
      session.on('streamDestroyed', streamDestroyed)
      session.on('exception', exception)
      session.on('signal:colorset', shareColorset)
      getToken().then(sessionConnect);
    }
  }, [session])

  const sessionConnect = (token) => {
    session
      .connect(
        token, { clientData: myUserName, clientRole: role },
      )
      .then(() => {
        let publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });
        session.publish(publisher);
        setMainStreamManager(publisher);
        setPublisher(publisher);
        setStreamManagers(session.streamManagers);
        if (role === CUSTOMER) { dispatch(setCustomer(publisher)) }
        if (role === CONSULTANT) { setConsultant(publisher) }
        dispatch(setSession(session))
      })
      .catch((error) => { });
  }

  useEffect(() => {
    if (session && session.streamManagers.length > 0) {
      setStreamManagers(session.streamManagers)
    }
  }, [session])

  useEffect(() => {
    if (streamManagers && role === CUSTOMER) {
      for (let i = 0; i < streamManagers.length; i++) {
        if (streamManagers[i].stream.connection.connectionId) {
          let subRole = JSON.parse(streamManagers[i].stream.connection.data).clientRole;
          if (testVideo === undefined && subRole === CUSTOMER) {
            console.log(streamManagers[i])
            // session.subscribe(streamManagers[i])
            setTestVideo(streamManagers[i])
          }
        }
      }
    }
  }, [streamManagers])

  useEffect(() => {
    if (session && role === CONSULTANT) {
      const data =
        `${JSON.stringify(selectedColor)}$$${JSON.stringify(bestColor)}$$${JSON.stringify(worstColor)}`;

      session.signal({
        data,
        to: [],
        type: 'colorset'
      }).then(() => { }).catch(() => { })
    }
  }, [selectedColor, bestColor, worstColor])


  const shareColorset = (event) => {
    const data = event.data.split('$$')
    const newSelectedColor = JSON.parse(data[0])
    const newBestColor = JSON.parse(data[1])
    const newWorstColor = JSON.parse(data[2])
    dispatch(sharedColorSet({ newSelectedColor, newBestColor, newWorstColor }))
  }

  const onbeforeunload = () => {
    leaveSession();
  }

  const deleteSubscriber = (streamManager) => {
    console.log(streamManager)
  }

  const joinSession = () => {
    const getOV = new OpenVidu();
    dispatch(setSession(getOV.initSession()))
    setOV(getOV)
  }

  const streamCreated = (event) => {
    const subscriber = session.subscribe(event.stream, undefined);
    const subRole = JSON.parse(event.stream.connection.data).clientRole;
    if (role === CONSULTANT) { dispatch(setCustomer(subscriber)) }
    else if (role === CUSTOMER) { subRole === CUSTOMER ? setTestVideo(subscriber) : setConsultant(subscriber) }
  }

  const streamDestroyed = (event) => {
    deleteSubscriber(event.stream.streamManager);
  }

  const exception = (exception) => {
    console.warn(exception);
  }


  const leaveSession = () => {
    if (session) {
      session.disconnect();
      dispatch(postConsultingResult({ files, consultingFinishRequest }))
        .then(() => {
          dispatch(changeComment(''))
          dispatch(selectTone(''))
          dispatch(setFiles(''))
        })
    }
    setOV(null);
    dispatch(setSession(undefined))
    setMySessionId(role === CONSULTANT ? tmp : consultantSessionName)
    setMyUserName(nickname)
    setConsultant(undefined)
    setCustomer(undefined)
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
              OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                OPENVIDU_SERVER_URL +
                '"',
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  }

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      const data = {
        "type": "WEBRTC",
        "role": "PUBLISHER",
        "kurentoOptions": {
          "videoMaxRecvBandwidth": 1000,
          "videoMinRecvBandwidth": 300,
          "videoMaxSendBandwidth": 1000,
          "videoMinSendBandwidth": 300,
          "allowedFilters": [
            "GStreamerFilter",
            "FaceOverlayFilter",
            "ChromaFilter"
          ]
        }
      };
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: 'Basic ' + btoa(
              'OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET
            ),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  // ---------- render
  return (
    <SContainer container backgroundColor={`${selectedColor}60`}>
      {session !== undefined ? (
        <SGridContainer container backgroundColor={`${selectedColor}10`}>

          {consultant !== undefined ? (
            <SGrid item xs={12} sm={2}>
              <Typography variant="small"
                sx={{
                  fontFamily: 'Happiness-Sans-Regular',
                }}
              >컨설턴트</Typography>
              <VideoContainer>
                <UserVideoComponent
                  streamManager={consultant} />
              </VideoContainer>
              <SelectedColorSet
                isBest={isBest}
                setIsBest={setIsBest}
                isWorst={isWorst}
                setIsWorst={setIsWorst}
              />
            </SGrid>
          )
            :
            <SpinnerGrid item xs={12} sm={2}>
              <CircularProgress />
            </SpinnerGrid>
          }

          {customer !== undefined ? (
            <SGrid item xs={12} sm={6}>
              <VideoContainer>
                <UserVideoComponent
                  streamManager={customer} />
              </VideoContainer>
              <ColorButtonGroup
                isBest={isBest}
                isWorst={isWorst}
              />
            </SGrid>
          )
            :
            <SpinnerGrid item xs={12} sm={6}>
              <CircularProgress />
            </SpinnerGrid>
          }

          {
            role === CONSULTANT &&
            <SGrid item xs={12} sm={4} sx={{ height: "90%" }}>              
              < ColorPalette
                isBest={isBest}
                isWorst={isWorst}
              />
              <Chat />
            </SGrid>
          }
          {customer !== undefined ? (
            <SGrid item xs={12} sm={4} sx={{ height: "90%" }}>
              {/* chat */}
              <Chat />
            </SGrid>
          )
            :
            <SpinnerGrid item xs={12} sm={4}>
              <CircularProgress />
            </SpinnerGrid>}
        </SGridContainer>
      )
        :
        <SpinnerGrid container>
          <Typography variant="h3">"연결을 눌러 주세요."</Typography>
        </SpinnerGrid>
      }


      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        maxWidth: '80%',
      }}>
        {
          !session ?
            <Button variant="contained" onClick={joinSession} sx={{ marginBottom: "1rem" }}>
              연결
            </Button>
            :
            <ButtonGroup sx={{ marginBottom: "1rem" }}>
              <IconButton
                color="inherit"
                onClick={() => {
                  publisher.publishAudio(!isMic)
                  setIsMic(!isMic)
                }}>
                {isMic ? <Mic /> : <MicOff color="secondary" />}
              </IconButton>

              <IconButton
                color="inherit"
                onClick={() => {
                  publisher.publishVideo(!isCam)
                  setIsCam(!isCam)
                }}>
                {isCam ? <Videocam /> : <VideocamOff color="secondary" />}
              </IconButton>
            </ButtonGroup>
        }

        <ButtonGroup sx={{ marginBottom: "1rem" }}>
          <Button variant="outlined" onClick={() => dispatch(settingModalOn())} >
            화면 조정
          </Button>
          <Button variant="outlined"
            onClick={() => {
              if (!mainStreamManager.stream.filter) {
                mainStreamManager.stream
                  .applyFilter("GStreamerFilter", { "command": "videobalance hue=-1.0 saturation=1.0" })
                  .then(() => { })
                  .catch((err) => { console.log(err) });
              } else {
                mainStreamManager.stream.removeFilter()
                  .then(() => {
                    mainStreamManager.stream
                      .applyFilter("GStreamerFilter", { "command": "videobalance hue=1.0 saturation=1.0" })
                      .then(() => { })
                  })
              }
            }}
          >
            테스트 버튼
          </Button>
          <Button variant="contained" onClick={leaveSession}>
            종료
          </Button>
        </ButtonGroup>
      </Box>
    </SContainer>
  )
}

export default ConsultingRoom

const SContainer = styled(Box)({
  padding: "1rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const SGridContainer = styled(Grid)({
  height: "100%",
  alignItems: "center",
})

const SpinnerGrid = styled(Grid)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
})

const SGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
})

const VideoContainer = styled(Box)({
  width: "90%",
  borderRadius: "1rem",
  padding: "1rem",
})

