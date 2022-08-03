import React from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { Button, Box, CardActions, CardContent, Card, Typography, Avatar, CardActionArea, styled } from '@mui/material';
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined';
const MyResHistoryItem = (props) => {
  const dispatch = useDispatch()
  return (
    <SetCard variant="outlined" className="history-card">
      <CardActionArea>
        <CardContent>
          {/* 컨설턴트정보, 날짜 */}
          <Avatar src={props.consultantImageUrl} sx={{ width: 100, height: 100, marginBottom: 1 }} alt="컨설턴트프로필" />
          <Forflex>
            <Typography gutterBottom variant="h6" component="div">
              {props.consultantNickname} 컨설턴트님
            </Typography>
            <Typography gutterBottom variant="h6" component="div" >
              예약일: {props.reservationDate}일 {props.reservationTime}
              <Typography gutterBottom variant="body2" component="span" sx={{ paddingLeft: 1 }} color="error">{!props.active ? '취소한 예약' : ''}</Typography>
            </Typography>
          </Forflex>

          <RequestBox>
            <Typography sx={{ marginBottom: 1 }}>컨설턴트님께 요청드려요 <LyricsOutlinedIcon /> </Typography>
            <RequestText name="isComment" defaultValue={props.request ? props.request : ''}
              placeholder={'요청사항이 없습니다.'}
            >
            </RequestText>
          </RequestBox>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div>
          <Button
            size="small"
            color="error"
            value={props.reservationId}
            onClick={props.clickHandler}
            disabled={!props.active}>
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
  borderRadius: 5,
  backgroundColor: "#F1F1F190",
  borderRadius: '1rem',
})
