import React, { useState, Component, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';


import { Box, Button, Grid, styled, Typography, ButtonGroup } from '@mui/material'

import { settingModalOn } from 'features/consulting/consultingRoom/consultSlice'
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = 'https://yourseasons.anveloper.kr:8443';
const OPENVIDU_SERVER_SECRET = 'YOUR_SEASONS_SECRET';

// rafce Arrow function style 
const ConsultingRoomCopy = () => {
  const { nickname, role } = useSelector(state => state.auth.logonUser)

  const [mySessionId, setMySessionId] = useState('SessionA')
  const [myUserName, setMyUserName] = useState(nickname)
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)

  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])

  const [OV, setOV] = useState(null)
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

  const onbeforeunload = () => {
    leaveSession();
  }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream)
    }
  }

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      const modiSubscrivers = subscribers.splice(index, 1);
      setSubscribers(modiSubscrivers)
    }
  }

  const joinSession = () => {
    const getOV = new OpenVidu();
    setSession(getOV.initSession())
    setOV(getOV)
  }

  const streamCreated = (event) => {
    const subscriber = session.subscribe(event.stream, undefined);
    let nSubscribers = subscribers
    nSubscribers.push(subscriber);
    setSubscribers(nSubscribers)
  }

  const streamDestroyed = (event) => {
    deleteSubscriber(event.stream.streamManager);
  }

  const exception = (exception) => {
    console.warn(exception);
  }

  useEffect((e) => {
    if (session) {
      console.log(e)
      session.on('streamCreated', streamCreated)
      session.on('streamDestroyed', streamDestroyed)
      session.on('exception', exception)

      getToken().then((token) => {
        session
          .connect(
            token,
            { clientData: myUserName },
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

            setMainStreamManager(publisher)
            setPublisher(publisher)
            setSession(session)
          })
          .catch((error) => { });
      });
    }
  }, [session])




  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(undefined)
    setSubscribers([])
    setMySessionId('SessionA')
    setMyUserName(nickname)
    setMainStreamManager(undefined)
    setPublisher(undefined)
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
      const data = {};
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: 'Basic ' + btoa(
              'OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET
            ),
            'Content-Type': 'application/json',
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
    <SContainer className="container">
      <Box>
        <Typography variant="h4">{mySessionId}</Typography>
        <Typography variant="h6">입장 닉네임 : "{nickname}"</Typography>
      </Box>
      {session !== undefined ? (
        <SGridContainer container>

          {publisher !== undefined ? (
            <SGrid item xs={12} sm={5}>
              <VideoContainer
                onClick={() =>
                  handleMainVideoStream(publisher)
                }>
                <UserVideoComponent
                  streamManager={publisher} />
              </VideoContainer>
            </SGrid>
          ) : null}

          {publisher !== undefined ? (
            <SGrid item xs={12} sm={5}>
              <VideoContainer
                onClick={() =>
                  handleMainVideoStream(publisher)
                }>
                <UserVideoComponent
                  streamManager={publisher} />
              </VideoContainer>
            </SGrid>
          ) : null}

          {subscribers.map((sub, i) => (
            <SGrid item xs={12} sm={5} key={i}>
              <VideoContainer
                onClick={() =>
                  handleMainVideoStream(sub)
                }>
                <UserVideoComponent streamManager={sub} />
              </VideoContainer>
            </SGrid>
          ))}

        </SGridContainer>
      ) : null}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        maxWidth: '80%',
      }}>
        <Button variant="contained" onClick={joinSession}>
          입장
        </Button>

        <ButtonGroup >
          <Button variant="outlined" onClick={() => dispatch(settingModalOn())} >
            화면 조정X
          </Button>
          <Button variant="outlined">
            화면 일시정지X
          </Button>
          <Button variant="contained" onClick={leaveSession}>
            종료
          </Button>
        </ButtonGroup>
      </Box>
    </SContainer>
  )
}

export default ConsultingRoomCopy

const SContainer = styled(Box)({
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
  margin: "1rem",
  height: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
})

const SGridContainer = styled(Grid)({
  height: "100%",
  marginTop: "2rem",
  justifyContent: "center"
})

const SGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

const VideoContainer = styled(Box)({
  width: "90%",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})

const PaletteContainer = styled(Box)({
  width: "90%",
  height: "90%",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})

