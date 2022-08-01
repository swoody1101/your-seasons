import React, { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { Button, Box, CardActions, CardContent, Card, Typography, Avatar, CardActionArea, styled } from '@mui/material';
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined';
import { deleteResFetch } from './myPageSlice';

const MyResHistoryItem = (reservation) => {
	// 주석 삭제X
  // const [editNow, setEditNow] = useState(false)
  const dispatch = useDispatch()
  // const [isrequest, setIsRequest] = useState(reservation.request)

  return (
    <SetCard variant="outlined" className="history-card">
      <CardActionArea>
        <CardContent>
          {/* 컨설턴트정보, 날짜 */}
          <Avatar src={reservation.consultantImg} sx={{ width: 100, height: 100, marginBottom: 1 }} alt="컨설턴트프로필" />
          <Forflex>
            <Typography gutterBottom variant="h6" component="div">
              {reservation.consultant} 컨설턴트님
            </Typography>
            <Typography gutterBottom variant="h6" component="div" >
              예약일: {reservation.reservationDate}일 {reservation.reservationTime}
              <Typography gutterBottom variant="body2" component="span" sx={{ paddingLeft: 1 }} color="error">{!reservation.isActive ? '예약불가' : ''}</Typography>
            </Typography>
          </Forflex>

          <RequestBox>
            <Typography sx={{ marginBottom: 1 }}>컨설턴트님께 요청드려요 <LyricsOutlinedIcon /> </Typography>
            <RequestText name="isComment"  defaultValue={reservation.request ? reservation.request : ''}
              placeholder={'요청사항이 없습니다.'}
							// 예약 request 수정버튼 필요시 주석처리 해제 
							// readOnly={!editNow}
              // style={{ backgroundColor: editNow === true ? '#cfe8fc' : 'white' }}
              // onChange={(e) => setIsRequest(e.target.value)}
							>
            </RequestText>
          </RequestBox>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div>
					{/* 예약 request 수정버튼 필요시 주석처리 해제 */}
          {/* <Button color="primary" sx={{ display: editNow ? 'none' : '' }} onClick={() => { setEditNow(true) }} disabled={!reservation.isActive}>수정</Button>
          <Button color="primary" sx={{ display: editNow ? '' : 'none' }}
            onClick={() => {
              if (isrequest.length < 10) {
                alert('10자이상 입력해 주세요')
              } else if (isrequest.length > 255) {
                alert('255자 미만 입력해주세요.')
              } else {
                setEditNow(false);
                dispatch(updateResFetch(isrequest))
              }
            }
            } disabled={!reservation.isActive}>수정완료</Button> */}
          <Button size="small" color="error" onClick={() => { dispatch(deleteResFetch(reservation.reservationId)) }} disabled={!reservation.isActive}>
            예약취소
          </Button>
        </div>
      </CardActions>
    </SetCard>
  )
}

export default MyResHistoryItem


const RequestBox = styled(Box)({
	border: '1px dashed #ADBED2',
	borderRadius: 5,
	padding: 10,
})



const Forflex = styled('div')`
	display:flex;
	justify-content: space-between;
	align-items: end;
	padding: 10px;
`

const RequestText = styled('textarea')`
	font-family: Roboto;
	font-size: 15px;
	border: none;
	background-color: #FFFFFF00;
	height: 100px;
	width: 100%;
	resize: none;
`


const SetCard = styled(Card)({
	marginBottom: 5, 
	// padding: 1, 
	borderRadius: 5,
  backgroundColor: "#F1F1F190",
  borderRadius: '1rem',
})