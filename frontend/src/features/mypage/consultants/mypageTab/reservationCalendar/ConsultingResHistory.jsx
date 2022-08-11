import { isEmpty } from 'lodash'
import React from 'react'
import ConsultingResHistoryItem from './ConsultingResHistoryItem'

export default function ConsultingResHistory(props) {
  const reservation = props.reservation


    return (<>
      {isEmpty(reservation) ? <h2>해당날짜는 예약 내역이 없습니다.</h2>
        :
        <div>
            <h2>예약목록</h2>
            {reservation.map((res) => (
                <ConsultingResHistoryItem
                    key={res.reservationId}
                    {...res}
                />
            ))}
        </div>
    }
  </>
  )
}