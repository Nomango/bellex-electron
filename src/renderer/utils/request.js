import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err ' + error)// for debug
    if (error.response) {
      Message.error({
        message: error.response.data.message
      })
    } else {
      Message.error({
        message: '未知异常！'
      })
    }
    return Promise.reject(error)
  }
)

export default service
