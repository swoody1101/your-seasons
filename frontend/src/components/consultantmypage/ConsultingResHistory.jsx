import React from 'react'
import ConsultingResHistoryItem from './ConsultingResHistoryItem'

export default function ConsultingResHistory(props) {
    if (props.reservation.length === 0) {
        return <h2>해당날짜는 예약 내역이 없습니다.</h2>
    }

    return (
        <div>
            <h2>예약목록</h2>
            {props.reservation.map((res) => (
                <ConsultingResHistoryItem
                    key={res.reservationId}
                    reservationDate={res.reservationDate}
                    reservationTime={res.reservationTime}
                    request={res.request}
                />
            ))}
        </div>
    )
}