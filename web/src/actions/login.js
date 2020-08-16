import { sendRequest } from '../backend';
import { addLanguageSuccess, getStats } from './languages';
import { settingsChanged } from './settings';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_NOT_LOGGED_IN = 'NOT_LOGGED_IN';

export function fetchAfterLogin(user) {
  return async function(dispatch) {
    dispatch(loginSuccess());
    dispatch(addLanguageSuccess(user.languages));
    dispatch(settingsChanged(user.settings));
    dispatch(getStats(user.email, user.languages));
  };
}

export function checkCurrentUser() {
  return async function(dispatch) {
    try {
      await sendRequest('users/whoami');
    } catch (error) {
      dispatch(logoutSuccess());
    }
  };
}

export function logout() {
  return async function(dispatch) {
    dispatch(logoutSuccess());
  };
}

export function logoutSuccess() {
  return {
    type: ACTION_LOGOUT,
  };
}

export function loginSuccess() {
  return {
    type: ACTION_LOGIN_SUCCESS,
  };
}
