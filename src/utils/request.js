import axios from 'axios'
import router from 'vue-router'
import { addPending, removePending } from '@/plugins/pendding/pendding.js'
const service = axios.create({
  // Base URL, 按照vue-cli的要求，在系统根目录下`.env.xx`文件中定义
  /**
     * Base Url, 定义在项目根目录 .env.xx（不同的xx代表不同的开发环境）
     * 前端发送Server请求到后端
     * 因为前后端分离，存在跨域，前后端都需要解决跨域请求
     * 前端处理跨域是在`vue.config.js`目录下，利用proxy将请求代理到实际的服务端地址
     */
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})
// 设置请求次数，请求的间隙
service.defaults.retry = 4
service.defaults.retryDelay = 1000

axios.interceptors.request.use(config => {
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  removePending(response) // 在请求结束后，移除本次请求
  if (response.status === 200 && window.sessionStorage.getItem('token')) {
    window.sessionStorage.setItem('isLogin', true)
  } else {
    window.sessionStorage.setItem('isLogin', false)
  }
  return response
}, error => {
  if (axios.isCancel(error)) {
    console.log('重复请求: ' + error.message)
  } else {
    // handle error code
    switch (error.response.status) {
      case 401:
        router.push('/login')
        break
      case 404:
        break
      case 500:
        break
    }
  }
  return Promise.reject(error)
})

export default service
