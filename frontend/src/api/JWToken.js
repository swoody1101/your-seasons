const tokenName = "Authorization"
const expireToken = "expiredTime"



export const getToken = () => {
  let date = new Date()
  if(window.localStorage.getItem(tokenName)){
    if(date > new Date(window.localStorage.getItem(expireToken))){
      // window.location.href = 'http://localhost:3000/' + "login"
      window.location.href = "https://yourseasons.ssafy.io/login"
      return false
    }else{
      return window.localStorage.getItem(tokenName);
    }
  }else{
    return false
  }
};

export const saveToken = (token) => {
  // 토큰 10시간 이후 만료  // 10000*60*60
  // 프론트에서 토큰 만료시간 8시간으로 설정 
  // 이유: 컨설팅 입장 및 종료시, 1시간 지나 있으므로 토큰 만료되어 데이터 전송 불가할 수 있으므로
  let date = new Date()
  let exp =  new Date(Date.parse(date) + 8000*60*60)
  
  window.localStorage.setItem(tokenName, token);
  window.localStorage.setItem(expireToken, exp)
};
export const deleteToken = () => {
  window.localStorage.removeItem(tokenName);
  window.localStorage.removeItem(expireToken);
};
