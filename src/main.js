import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import vant from 'vant'

import { Form, Button, Field, Toast, Icon, Loading } from 'vant'
axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$http = axios
let cancel
// 防止多次点击发起重复的请求
axios.interceptors.request.use(
  config => {
    if (typeof cancel === 'function') {
      cancel('取消请求')
    }
    config.cancelToken = new axios.CancelToken((c) => {
      cancel = c
    })
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

Vue.config.productionTip = false

Vue.use(Form)
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
