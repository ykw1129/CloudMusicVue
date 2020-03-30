import axios from 'axios'
import { addPending, removePending } from './pendding/pendding.js'
axios.interceptors.request.use(config => {
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  // other code before request
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  removePending(response) // 在请求结束后，移除本次请求
  if (response.status === 200 && window.sessionStorage.getItem('token')) {
    window.sessionStorage.setItem('isLogin', true)
  }
  return response
}, error => {
  if (axios.isCancel(error)) {
    console.log('repeated request: ' + error.message)
  } else {
    // handle error code
  }
  return Promise.reject(error)
})
