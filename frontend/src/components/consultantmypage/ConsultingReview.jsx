import React from "react";
import UserReviewList from "./UserReviewList"

const ConsultingReview = () => {
    const reviews = [
        {
            id: 1,
            nickname: '치당',
            rating: 4.6,
            date: new Date(2022, 6, 21),
            review: "최근에 MBTI만큼이나 퍼스널컬러에 대한 관심이 많아져서 검사 한 번 받아보고 싶었는데 좋은 기회였습니다."
        },
        {
            id: 2,
            nickname: '당치땡',
            rating: 4.8,
            date: new Date(2022, 6, 13),
            review: "날도 더운데 직접 가지 않아도 되고, 화장도 고칠 필요 없이 퍼스널 컬러 진단을 내 집에서! 개꿀이었습니다~"
        },
        {
            id: 3,
            nickname: '치밥굿',
            rating: 4.7,
            date: new Date(2022, 6, 7),
            review: "저번에 오프라인으로 검사받을때는 검사비가 후덜덜 했는데 지금은 너무 싸서 좋아요!"
        }
    ]

    return (
        <UserReviewList reviews={reviews} />
    )
}

export default ConsultingReview