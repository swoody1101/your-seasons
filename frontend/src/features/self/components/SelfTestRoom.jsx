import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';

import { Box, Button, Grid, styled, Typography, ButtonGroup, IconButton, CircularProgress, Card } from '@mui/material'
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';


import { setSnackbarMessage, setSnackBarOpen } from 'common/snackbar/snackbarSlice';
import { settingModalOn, setSession, setCustomer } from 'features/self/selfSlice'

import { CONSULTANT, CUSTOMER } from 'api/CustomConst'
import { sharedColorSet, changeComment, selectTone, setFiles } from 'common/colorset/colorSetSlice'

import ColorPalette from 'common/colorset/ColorPalette'
import SelectedColorSet from 'common/colorset/SelectedColorSet';
import ConSelectedColorSet from 'common/colorset/ConSelectedColorSet';
import ColorButtonGroup from 'common/colorset/ColorButtonGroup'

const OPENVIDU_SERVER_URL = 'https://yourseasons.anveloper.kr:8443';
const OPENVIDU_SERVER_SECRET = 'YOUR_SEASONS_SECRET';

// rafce Arrow function style 
const SelfTestRoom = () => {
  const { nickname, email, role, imageUrl } = useSelector(state => state.auth.logonUser) //nickname, email, role,
  const { session, customer } = useSelector(state => state.self)
  const tmp = email.replace(/[@\.]/g, '-')
  const [mySessionId, setMySessionId] = useState(tmp)

  const [isBest, setIsBest] = useState(false)
  const [isWorst, setIsWorst] = useState(false)
  const [clickColorFirst, setClickColorFirst] = useState(false)

  const [myUserName, setMyUserName] = useState(nickname)

  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [consultant, setConsultant] = useState(undefined)

  const [OV, setOV] = useState(null)

  const [isMic, setIsMic] = useState(true)
  const [isCam, setIsCam] = useState(true)
  const { selectedColor, bestColor, worstColor } = useSelector(state => state.colorSetList)

  // 코멘트, 진단결과 톤, 진단결과 이미지 정보
  const comment = useSelector(state => state.colorSetList.comment)
  const selectedTone = useSelector(state => state.colorSetList.tone)

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
          resolution: '1280x960',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });
        publisher.subscribeToRemote()
        session.publish(publisher);
        setMainStreamManager(publisher);
        setPublisher(publisher);
        dispatch(setCustomer(publisher))
        dispatch(setSession(session))
      })
      .catch((error) => { });
  }

  // 하단 alert관련
  const clickColorFirstFunc = () => {
    if (clickColorFirst === false) {
      setClickColorFirst(true)
      dispatch(setSnackbarMessage('컬러를 성공적으로 추가하였습니다! 컬러팔레트 안의 색상을 선택한 후 제거해보세요.'))
      dispatch(setSnackBarOpen(true))
    } else {
      return
    }
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
    console.log(subscriber) // 불필요
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
    }
    setOV(null);
    dispatch(setSession(undefined))
    setMySessionId(tmp)
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
    <SContainer container >
      {session !== undefined ? (
        // 세션 연결시
        <SGridContainer container spacing={2}>
          <SGrid item xs={12} sm={1} />
          <UserVideoSGrid item xs={12} sm={6}>
            {customer !== undefined ? (
              // 유저 비디오 및 베스트 및 컬러셋
              <VideoContainer>
                <UserVideoComponent
                  streamManager={customer} />
              </VideoContainer>
            )
              :
              <SpinnerGrid item xs={12} sm={6}>
                <CircularProgress />
              </SpinnerGrid>
            }
            <ColorButtonGroup
              clickColorFirstFunc={clickColorFirstFunc}
              clickColorFirst={clickColorFirst}
              isBest={isBest}
              isWorst={isWorst}
              setIsBest={setIsBest}
              setIsWorst={setIsWorst}
            />
          </UserVideoSGrid>
          <SGrid item xs={12} sm={1} />
          <Grid item xs={12} sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: '100%',
            }}>
            <ColorPalette
              isBest={isBest}
              isWorst={isWorst}
            />
          </Grid>
        </SGridContainer>
      )
        :
        // 세션 연결 안됐을시
        <SpinnerGrid container>
          <Typography variant="h3">"연결을 눌러 주세요."</Typography>
        </SpinnerGrid>
      }



      {/* 하단 || 선택된 베스트, 워스트 컬러팔레트 || 마이크, 카메라, 종료버튼 */}
      <BottomBox>
        {
          // 세션연결 안됐을시
          !session ?
            <>
              <BottomBtn variant="contained" onClick={joinSession}>
                연결
              </BottomBtn>
              <BottomBtn variant="contained" onClick={leaveSession}>
                종료
              </BottomBtn>
            </>
            :
            // 세션 연결시 
            <>
              {/* 베스트,워스트 컬러셋 || 마이크,캠,종료버튼 */}
              {/* 컬러셋 */}
              <SelectedColorSet
                setIsBest={setIsBest}
                setIsWorst={setIsWorst}
              />
              {/* 마이크,캠 + 필터 + 종료*/}
              <MicCamExitGroup>
                {/* 마이크 */}
                <CustomIconButton
                  color="inherit"
                  onClick={() => {
                    publisher.publishAudio(!isMic)
                    setIsMic(!isMic)
                  }}>
                  {isMic ? <Mic /> : <MicOff color="secondary" />}
                </CustomIconButton>
                {/* 캠 */}
                <CustomIconButton
                  color="inherit"
                  onClick={() => {
                    publisher.publishVideo(!isCam)
                    setIsCam(!isCam)
                  }}>
                  {isCam ? <Videocam /> : <VideocamOff color="secondary" />}
                </CustomIconButton>
                {/*  화면조정, 필터, 종료 */}
                <ButtonGroup style={{ gap: 3 }}>
                  <BottomBtn variant="contained" onClick={() => dispatch(settingModalOn())} >
                    화면 조정
                  </BottomBtn>
                  <BottomBtn variant="contained"
                    onClick={() => {
                      if (customer.stream.filter) {
                        customer.stream.removeFilter()
                      }
                    }}
                  >
                    톤 필터 지우기
                  </BottomBtn>
                  <BottomBtn variant="contained" onClick={leaveSession}>
                    종료
                  </BottomBtn>
                </ButtonGroup>
              </MicCamExitGroup>
            </>}
      </BottomBox>

    </SContainer >
  )
}

export default SelfTestRoom

// 전체포함 margin으로 띄운 상태
const SContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: 'center',
  padding: "1rem",
  margin: '3vh',
  height: "94vh",

  boxSizing: 'border-box',
  border: '2px solid #5A4D4D',
  backgroundColor: '#FAFAFA',
  borderRadius: '15px',
  boxShadow: '1px 2px 9px #B1B7B7',
})



// 공용버튼 제외 모두 포함 (상위)
// height 90% / 나머지 10% 하단
const SGridContainer = styled(Grid)({
  height: '84vh',  //"90%",
  display: 'flex',
  alignItems: "center",
  // columnGap: 2,
})

// 하위 그리드
const SGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // height: '100%',
})

// 연결안됐을시 스피너
const SpinnerGrid = styled(Grid)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
})

// 비디오 컨테이너
const VideoContainer = styled(Box)({
  width: "100%",
  // borderRadius: "1rem",
  // padding: "1rem",
})

const UserVideoSGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
})


// 하단 10%
const BottomBox = styled(Box)({
  // backgroundColor: 'blue',
  height: '10vh',//'10%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "space-between",
  alignItems: 'center',
  width: '100%',
  maxWidth: '90%',
})


const CustomIconButton = styled(IconButton)((props) => ({
  backgroundColor: '#99968D',
  color: 'white',
  '&:hover': {
    backgroundColor: '#66635C',
    color: 'black',
    fontWeight: 'normal',
  },
  fontWeight: 'normal',
  border: '1px solid #66635C',
  borderRadius: '10%',
  height: '3rem',
}))

const BottomBtn = styled(Button)((props) => ({
  backgroundColor: '#99968D',
  color: 'white',
  '&:hover': {
    backgroundColor: '#66635C',
    color: 'black',
    fontWeight: 'normal',
  },
  fontWeight: 'normal',
  border: '1px solid #66635C',
  // width: `${props.wd}px`,
  height: '3rem',
}))

// 1-2그룹 => 마이크,캠,종료
const MicCamExitGroup = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  gap: 3,
})
