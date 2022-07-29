const tokenName = "X-Auth-Token";

export const getToken = () => {
  return window.localStorage.getItem(tokenName);
};
export const saveToken = (token) => {
  window.localStorage.setItem(tokenName, token);
};
export const deleteToken = () => {
  window.localStorage.removeItem(tokenName);
};
