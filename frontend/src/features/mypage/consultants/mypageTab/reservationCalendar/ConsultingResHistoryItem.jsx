import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ConsultingResHistoryItem(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.reservationTime}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          닉네임 : {props.nickname}
        </Typography>
        <Typography>
          요청사항 : {props.request}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
