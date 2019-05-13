import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const time = 1 / 48

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: time
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
