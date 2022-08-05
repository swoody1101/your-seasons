import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';


import { Box, Button, Grid, styled, Typography, ButtonGroup } from '@mui/material'

import { settingModalOn } from 'features/consulting/consultingRoom/consultSlice'
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = 'https://yourseasons.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'YOUR_SEASONS_SECRET';


class ConsultingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: 'SessionA', // 임시 고정값
      myUserName: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],

      // test
      customer: undefined,
      consultant: undefined,

    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      'beforeunload',
      this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {

          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(
              token,
              { clientData: this.state.myUserName },
            )
            .then(() => {

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => { });
        });
      },
    );
  }

  leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined
    });
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

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
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

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
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
  // ================================================
  render() {
    const { logonUser } = this.props.auth;
    const { nickname, role } = logonUser;

    return (
      <SContainer className="container">
        <Typography variant="h4">{this.state.mySessionId}</Typography>
        <Typography variant="h6">입장 닉네임 : "{nickname}"</Typography>

        {this.state.session !== undefined ? (
          <SGridContainer container>

            {this.state.publisher !== undefined ? (
              <SGrid item xs={12} sm={4}>
                <VideoContainer
                  onClick={() =>
                    this.handleMainVideoStream(this.state.publisher)
                  }>
                  <UserVideoComponent
                    streamManager={this.state.publisher} />
                </VideoContainer>
              </SGrid>
            ) : null}

            {this.state.subscribers.map((sub, i) => (
              <SGrid item xs={12} sm={4} key={i}>
                <VideoContainer
                  onClick={() =>
                    this.handleMainVideoStream(sub)
                  }>
                  <UserVideoComponent streamManager={sub} />
                </VideoContainer>
              </SGrid>
            ))}

          </SGridContainer>
        ) : null}
        <ButtonGroup sx={{ justifyContent: "end", xs: { width: "100%" }, width: "40%" }}>
          <Button variant="outlined" onClick={() => this.props.doSettingModalOn()} >
            화면 조정
          </Button>
          <Button variant="outlined">
            화면 일시정지
          </Button>
          <Button variant="contained">
            종료
          </Button>
        </ButtonGroup>
      </SContainer>
    );
  }

}
const mapStateToProps = (state) => ({
  auth: state.auth,
  consult: state.consult
});
const mapDispatchToProps = (dispatch) => {
  return {
    doSettingModalOn: () => dispatch(settingModalOn()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConsultingRoom);


const SContainer = styled(Box)({
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
  margin: "1rem",
  height: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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

