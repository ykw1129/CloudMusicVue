import axios from 'axios'
let cancel
const urlhistory = new Set()
// 防止多次点击发起重复的请求
axios.interceptors.request.use(
  config => {
    if (typeof cancel === 'function' && urlhistory.has(config.url)) {
      cancel('取消请求')
    }
    config.cancelToken = new axios.CancelToken((c) => {
      cancel = c
    })
    urlhistory.add(config.url)
    return config
  })
axios.interceptors.response.use(
  res => {
    cancel = null
    return res
  },
  err => {
    if (axios.isCancel(err)) {
      // console.log('请求取消的错误', err.message)
      return new Promise(() => {})
      // 中断promise链
    } else {
      cancel = null
      // eslint-disable-next-line new-cap
      return new Promise.reject(err)
      // 错误向下传递
    }
  }
)
