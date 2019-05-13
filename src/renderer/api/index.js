import axios from '@/utils/request'

export const POST = (url, params) => {
  return axios.post(`${url}`, params)
}

export const REPOST = (url, params) => {
  const formData = new FormData()
  for (let i in params) {
    formData.append(i, params[i])
  }
  return axios.post(`${url}`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const GET = (url, params) => {
  return axios.get(`${url}`, {
    params
  })
}

export const DELETE = (url, params) => {
  return axios.delete(`${url}`, {
    params
  })
}

export const PUT = (url, params) => {
  return axios.put(`${url}`, params)
}
