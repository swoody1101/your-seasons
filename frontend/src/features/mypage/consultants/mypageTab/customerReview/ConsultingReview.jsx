import React from "react";
import { useSelector } from 'react-redux';
import UserReviewList from "./UserReviewList"

const ConsultingReview = () => {
    const reviews = useSelector(state => state.mypage.reviews).reviews
    return (
        <UserReviewList reviews={reviews} />
    )
}

export default ConsultingReview