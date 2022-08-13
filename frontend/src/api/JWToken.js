import  { baseURL }  from './Axios'
const tokenName = "Authorization"
const expireToken = "expiredTime"



export const getToken = () => {
  let date = new Date()
  if(window.localStorage.getItem(tokenName)){
    if(date > new Date(window.localStorage.getItem(expireToken))){
      // window.location.href = 'http://localhost:3000/' + "login"
      window.location.href = baseURL + "login"
      return false
    }else{
      return window.localStorage.getItem(tokenName);
    }
  }else{
    return false
  }
};

export const saveToken = (token) => {
  // 토큰 10시간 이후 만료
  let date = new Date()
  let exp =  new Date(Date.parse(date) + 10000*60*60)
  
  window.localStorage.setItem(tokenName, token);
  window.localStorage.setItem(expireToken, exp)
};
export const deleteToken = () => {
  window.localStorage.removeItem(tokenName);
  window.localStorage.removeItem(expireToken);
};
