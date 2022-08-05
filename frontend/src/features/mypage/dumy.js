// 예약 더미데이터
export const reservations = [
  {
    reservationId: 1,
    reservationDate: '20220119',  //(1) 날짜 지남
    reservationTime: '14:00:00',
    consultant: '우영우',
    consultantImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbpoUrCurs17HjSW-4RYSYJCo2zYRR1JIuogGzwzTpEz3YeImQ',
    request: '이 사건은 재미있습니다. 제가 좋아하는 고래 퀴즈 같아요. 몸무게가 22톤인 암컷 향고래가 500kg에 달하는 대왕오징어를 먹고 6시간 뒤 1.3톤짜리 알을 낳았다면 이 암컷 향고래의 몸무게는 얼마일까요? 정답은 ‘고래는 알을 낳을 수 없다’입니다. 고래는 포유류라 알이 아닌 새끼를 낳으니까요. 무게에만 초점을 맞추면 문제를 풀 수 없습니다. 핵심을 봐야 돼요.고래는 알을 낳을 수 없다’입니다. 고래는 포유류라 알이 아닌 새끼를 낳으니까요. 255자@@',
    isActive: false,
  },
  {
    reservationId: 2,
    reservationDate: '20220808', //(2)
    reservationTime: '07:30:00',
    consultant: '동그라미',
    consultantImg: 'https://w.namu.la/s/48c7bd939908e9465b5ac99febd4f6bcd39f2cf2f39bcee0a312b31b56d07315582137e3f966a7d2a7424be61064c64c9712c9b9a93a55adcbc5cd1b1b183722fb169d59c0dcdd0f7d6a5ef05be46e5b58fb3fba5bf08ba1923999002dcc4a2376a50f9a6b0a4ba01bc643f90f06db45',
    request: '',
    isActive: true,
  },

  {
    reservationId: 3,
    reservationDate: '20220831',  //(3) 가장 최근
    reservationTime: '09:00:00',
    consultant: '이준호',
    consultantImg: 'https://w.namu.la/s/63d8422592e52db967ab25884af70f125c9d04d2ef88b000e554f863dcde58b0bede0a11664b24cef74b672f5fc3614790025de62aac640cc79043a77f73f55f722ce34d2834c4d7408f31dc14a14682f92c5c3149da70cd56cccd5fe2175f59d9217532bcbd86b32138fe002a1d33cb',
    request: '이게 가장 최근 예약이에요. 저는 여름 쿨톤일까요 겨울 쿨톤일까요 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae impedit ipsa. Nihil quia nemo, at fugit, laborum aliquam, dolores ducimus quod unde numquam eveniet aut? Dignissimos laboriosam repellendus adipisci!',
    isActive: true,
  },
]


// 진단기록 더미데이터
export const consultantDiagnosis = [
  {
    consultantId: 2,
    consultingId: 3,
    tone: "가을웜톤",
    consultantNickname: "히사시부리",
    consultantImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Joo_Won_in_August_2020.jpg",
    consultingDate: '2022-01-19',
    bestColorSet: ["#0000FF", "#FF0000", "#00FF00"],
    worstColorSet: ["#C0C0C0", "#808080", "#00FF00"],
    resultImageUrl: "https://cdn.imweb.me/thumbnail/20211226/af5ae627d9c53.png",
    comment: "치당님은 웜톤입니다 ~~~ 베스트컬러는 비비드한게 잘어울리는~Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab architecto alias unde laudantium obcaecati numquam. Molestias iusto consequatur, officiis dolore ipsum enim minus similique iure veritatis tenetur repellat cumque neque!~~~~",
    hasReview: true,
  },
  {
    consultantId: 3,
    consultingId: 4,
    tone: "봄웜톤",
    consultantNickname: "asdf",
    consultantImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Joo_Won_in_August_2020.jpg",
    consultingDate: '2022-01-19',
    bestColorSet: ["#0000FF", "#FF0000", "#00FF00"],
    worstColorSet: ["#C0C0C0", "#808080", "#00FF00"],
    resultImageUrl: "https://cdn.imweb.me/thumbnail/20211226/af5ae627d9c53.png",
    comment: "치당님은 ㅏㅏ ",
    hasReview: true,
  },
  {
    consultantId: 1,
    consultingId: 6,
    tone: "가을웜톤",
    consultantNickname: "가나다라",
    consultantImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Joo_Won_in_August_2020.jpg",
    consultingDate: '2022-01-19',
    bestColorSet: ["#0000FF", "#FF0000", "#00FF00"],
    worstColorSet: ["#C0C0C0", "#808080", "#00FF00"],
    resultImageUrl: "https://cdn.imweb.me/thumbnail/20211226/af5ae627d9c53.png",
    comment: "가나다라마바사 ",
    hasReview: false,
  },
]

// 리뷰 더미데이터
export const myReview = [
  {
    reviewId: '1',
    nickname: "우영우",
    imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbpoUrCurs17HjSW-4RYSYJCo2zYRR1JIuogGzwzTpEz3YeImQ",
    star: 4,
    comment: "리뷰아이디 1 치당 !",
    reviewDate: ' 2022-07-20'
  },
  {
    reviewId: '2',
    nickname: "동그라미",
    imageUrl: "https://w.namu.la/s/48c7bd939908e9465b5ac99febd4f6bcd39f2cf2f39bcee0a312b31b56d07315582137e3f966a7d2a7424be61064c64c9712c9b9a93a55adcbc5cd1b1b183722fb169d59c0dcdd0f7d6a5ef05be46e5b58fb3fba5bf08ba1923999002dcc4a2376a50f9a6b0a4ba01bc643f90f06db45",
    star: 5,
    comment: "리뷰아이디 2 오늘 컨설턴트님이 진단해주신 컬러가 너무 좋았어요~!",
    reviewDate: '2022-07-20'
  }
]