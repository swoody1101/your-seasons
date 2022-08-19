import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import { signOut } from 'features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { BAD_REQUEST, NOT_FOUND, CONFLICT } from 'api/CustomConst'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'features/auth/authSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SignOutModal = () => {
  const { role } = useSelector((state) => state.auth.logonUser)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut(role))
      .unwrap()
      .then((res) => {
        dispatch(logoutUser())
        alert("계정 삭제 요청이 정상적으로 처리되었습니다. 로그아웃 됩니다.")
        navigate('/')
      })
      .catch((err) => {
        if (err.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.status === NOT_FOUND) {
          alert('없는 아이디 이거나 잘못된 정보입니다.')
        } else if (err.status === CONFLICT) {
          alert('거절된 내용입니다.')
        }
      })
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color='error'
      >탈퇴하기
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              계정 영구 삭제 확인
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              회원님의 계정을 삭제합니다. 계정을 삭제하려면 계정삭제 버튼을 클릭하세요. 계정삭제를 요청한 후 30일 동안은 계정을 다시 활성화하고 삭제를 취소할 수 있습니다. 30일의 유예 기간이 끝나면 계정과 관련한 모든 데이터가 영구적으로 삭제됩니다. 당신의 계절과 함께 해주셔서 감사했습니다.
            </Typography>
            <ButtonGroup
              sx={{
                marginTop: '4rem',
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
              }}
            >
              <Button
                variant="contained"
                onClick={handleClose}>
                취소
              </Button>
              <Button
                variant="contained"
                color='error'
                onClick={handleSignOut}>
                계정삭제
              </Button>
            </ButtonGroup>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SignOutModal