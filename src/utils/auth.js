import Cookies from 'js-cookie'

const TokenKey = 'hr-saas-project-token' // 存储token的name
// 存储用于验证token超时的时间戳
const timeKey = 'hr-saas-project-timestamp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function setTimeStamp() {
  Cookies.set(timeKey, new Date().getTime())
}
