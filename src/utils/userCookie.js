import Cookid from 'js-cookie';

// 用户的所有信息
/**
 *
 * @param {object} info
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookid.set(arr[i][0], arr[i][1]);
  }
  return true;
}
// 获取用户信息
export function getUserCookid() {
  return {
    username: Cookid.get('username'),
    appkey: Cookid.get('appkey'),
    role: Cookid.get('role'),
    email: Cookid.get('email'),
  };
}
export function removeCookie() {
  Cookid.remove('username');
  Cookid.remove('appkey');
  Cookid.remove('role');
  Cookid.remove('email');
  return true;
}
