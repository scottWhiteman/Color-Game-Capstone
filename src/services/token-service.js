import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN, token);
  },
  saveUserId(id) {
    window.localStorage.setItem('user_id', id);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN)
  },
  getUserId() {
    return window.localStorage.getItem('user_id');
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN);
  },
  clearUserId() {
    window.localStorage.removeItem('user_id');
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  hasUserId() {
    return !!TokenService.getUserId();
  },
  makeAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  }
}

export default TokenService;