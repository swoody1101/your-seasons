import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ButtonGroup, Button, Container, Grid, styled, TextField } from '@mui/material'
import { BAD_REQUEST, NOT_FOUND, CONFLICT } from '../../api/CustomConst'
import { modifyConsultant, loadMember } from './modifySlice'

const ModifyConsultant = () => {
  const { role } = useSelector((state) => state.login.logonUser)
  const common = useSelector((state) => state.modify.common)
  const { introduction, cost } = useSelector((state) => state.modify.common)
  // const { introduction } = 'asdf';
  const [newIntroduction, setNewIntroduction] = useState(introduction);
  const [newCost, setNewCost] = useState(cost);

  // 수정여부
  const [isModiIntro, setIsModiIntro] = useState(false);
  const [isModiCost, setIsModiCost] = useState(false);

  const dispatch = useDispatch();

  const handleModify = () => {
    common.introduction = newIntroduction ? newIntroduction : introduction;
    common.cost = newCost ? newCost : cost;
    dispatch(modifyConsultant(common))
      .unwrap()
      .then((res) => {
        alert("수정이 완료되었습니다.")
        dispatch(loadMember(role))
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
            <IntromGrid item xs={12}>
              <Textarea
                value={newIntroduction}
                onChange={e => setNewIntroduction(e.target.value)} />
            </IntromGrid>
            :
            <IntromGrid item xs={12}>
              {introduction}
              <Button
                onClick={
                  () => setIsModiIntro(true)
                }
              >
                수정
              </Button>
            </IntromGrid>
        }
        <h2>컨설팅 비용</h2>
        <Grid xs={12}>
          <Grid xs={3}>
          </Grid>
          <Grid xs={8}>
            {
              isModiCost ?
                <Grid item xs={12}>
                  <TextField
                    value={newIntroduction}
                    onChange={e => setNewIntroduction(e.target.value)} />
                </Grid>
                :
                <CostGrid item xs={12}>
                  <StyledSpan >
                    금액 :
                  </StyledSpan>
                  {cost}
                  <Button
                    onClick={
                      () => setIsModiIntro(true)
                    }
                  >
                    수정
                  </Button>
                </CostGrid>
            }
          </Grid>
        </Grid>
      </Grid>
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
            onClick={() => {
              setIsModiIntro(false);
              setIsModiCost(false);
            }}
          >취소</Button>
          <Button
            onClick={handleModify}
          >확인</Button>
        </ButtonGroup>
      }
    </Container >
  )
}

export default ModifyConsultant

const IntromGrid = styled(Grid)({
  border: '1px solid #00000070',
  borderRadius: '0.4rem',
  padding: '0.4rem',
  minHeight: '200px',
  position: 'relative',
  button: {
    position: 'absolute',
    bottom: '0.2rem',
    right: '0.4rem',
  }
})

const CostGrid = styled(Grid)({
  padding: '0.4rem',
  minHeight: '3rem',
  position: 'relative',
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