import AppConstants from "./../../constants/AppConstants";

export const setLocaleStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocaleStorage = (key) => {
  return {
    value: localStorage.getItem(key),
  };
};
export const setLoginAuth = (token, username) => {
  setLocaleStorage(AppConstants.TOKEN, token);
  setLocaleStorage(AppConstants.USER_NAME, username);
};

export const getLoginAuth = () => {
  return {
    token: getLocaleStorage(AppConstants.TOKEN),
    username: getLocaleStorage(AppConstants.USER_NAME),
  };
};

export default { getLoginAuth, setLoginAuth };
