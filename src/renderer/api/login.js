import request from '@/utils/request'
import * as API from './'

export default {
  getLogin: params => {
    return API.POST('user/login', params)
  },
  logout: params => {
    return API.POST('user/logout', params)
  },
  resetPsd: params => {
    return API.REPOST('user/password', params)
  },
  getProfileInfo: params => {
    return API.GET('user/status', params)
  },
  updateProfileInfo: params => {
    return API.POST('user/profile', params)
  }
}

export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/user/status',
    method: 'get',
    params: { token }
  }).catch(() => {
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  }).catch(() => {
  })
}
