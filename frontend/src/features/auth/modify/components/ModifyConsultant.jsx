import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonGroup, Button, Container, Grid, styled, TextField } from '@mui/material'
import { BAD_REQUEST, NOT_FOUND, CONFLICT } from 'api/CustomConst'
import { modifyMember, loadMember } from 'features/auth/authSlice'

const ModifyConsultant = () => {
  const { role } = useSelector((state) => state.auth.logonUser)
  const common = useSelector((state) => state.auth.logonUser)
  const { introduction, cost } = useSelector((state) => state.auth.logonUser)
  const [newIntroduction, setNewIntroduction] = useState(introduction ? introduction : '');
  const [newCost, setNewCost] = useState(cost ? cost : '');
  const [helperText, setHelperText] = useState('');
  // 수정여부
  const [isModiIntro, setIsModiIntro] = useState(false);
  const [isModiCost, setIsModiCost] = useState(false);

  const dispatch = useDispatch();

  const handleCost = (e) => {
    let c = e.target.value
    setHelperText('')
    if (/^[0-9\b ,]{0,6}$/.test(c)) {
      setNewCost(c)
    } else {
      setHelperText('100만원을 초과할 수 없습니다.')
    }
  }

  const iscost = cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')


  const handleModify = () => {
    const modiData = {
      role: role,
      nickname: common.nickname,
      contact: common.contact,
      introduction: newIntroduction,
      imageUrl: common.imageUrl,
      cost: newCost
    }
    dispatch(modifyMember(modiData))
      .unwrap()
      .then((res) => {
        alert("수정이 완료되었습니다.")
        dispatch(loadMember(role))
        setIsModiIntro(false);
        setIsModiCost(false)
        setNewIntroduction(introduction ? newIntroduction : '')
        setNewCost(cost ? newCost : '');
      })
      .catch((err) => {
        if (err.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.status === NOT_FOUND) {
          alert('없는 아이디 이거나 잘못된 정보입니다.')
        } else if (err.status === CONFLICT) {
          alert('거절된 수정내용입니다.')
        }
      })
  }

  return (
    <Container>
      <h1>컨설턴트 정보</h1>
      <Grid container m={2} gap={3}>
        <h2>컨설턴트 소개글</h2>
        {
          isModiIntro ?
            <IntroGrid item xs={12}>
              <Textarea
                placeholder={'소개글 앞의 30자는 <컨설턴트목록>에 노출됩니다. 150자 이내로 작성해주세요.'}
                value={newIntroduction}
                onChange={e => setNewIntroduction(e.target.value)} />
            </IntroGrid>
            :
            <IntroGrid item xs={12}>
              {introduction}
              <Button
                onClick={
                  () => setIsModiIntro(true)
                }
              >
                수정
              </Button>
            </IntroGrid>
        }
        <h2>컨설팅 비용</h2>
        <Grid item xs={12}>
          <Grid item xs={8}>
            {
              isModiCost ?
                <TextField
                  helperText={helperText}
                  value={newCost}
                  onChange={handleCost} />
                :
                <Grid item>
                  <StyledSpan >{cost ? iscost + ' 원' : ''}</StyledSpan>
                  <Button
                    onClick={
                      () => setIsModiCost(true)
                    }
                  >
                    수정
                  </Button>
                </Grid>
            }
          </Grid>
        </Grid>
      </Grid >
      {
        (isModiIntro || isModiCost)
        &&
        <ButtonGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end"
          }}
        >
          <Button
            color='error'
            onClick={() => {
              setNewIntroduction(introduction);
              setNewCost(cost);
              setIsModiIntro(false);
              setIsModiCost(false);
            }}
          >취소</Button>
          <Button
            color='error'
            onClick={handleModify}
          >확인</Button>
        </ButtonGroup>
      }
    </Container >
  )
}

export default ModifyConsultant

const IntroGrid = styled(Grid)({
  border: '1px solid #00000070',
  borderRadius: '0.4rem',
  padding: '0.4rem',
  minHeight: '200px',
  position: 'relative',
  pontSize: '2rem',
  button: {
    position: 'absolute',
    bottom: '0.2rem',
    right: '0.4rem',
  }
})

const Textarea = styled('textarea')({
  width: '100%',
  height: '100%',
  resize: 'none',
  fontSize: '1.2rem'
})

const StyledSpan = styled('span')({
  fontSize: '1.6rem',
  justifyContent: 'end'
})