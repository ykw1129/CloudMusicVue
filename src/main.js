import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/reponsive'
import '@vant/touch-emulator'
import 'default-passive-events'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import sessionMethods from './plugins/sessionStorage'
import localMethods from './plugins/localStorage'
import './plugins/rules'
import './plugins/vant'
import './plugins/interceptors'
import { Dialog } from 'vant'
extend('required', required)
extend('email', email)
// 设置
// window.console.log = console.log() // 打开默认设置
// window.console.log = function () {} // 关闭默认设置
// axios.defaults.baseURL = 'https://mapi.ykweb.xyz'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// 年月日
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})
// 年月日 时分秒
Vue.filter('dateFormatAccurate', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.directive('loading', {
  update (el, binding, vnode) {
    console.log(el, binding, vnode)
    if (binding.value) {
      const div = document.createElement('div')
      div.innerText = '加载中...'
      div.setAttribute('id', 'loading')
      div.style.position = 'fixed'
      div.style.left = 0
      div.style.top = 0
      div.style.width = '100%'
      div.style.height = '100%'
      div.style.display = 'flex'
      div.style.justifyContent = 'center'
      div.style.alignItems = 'center'
      div.style.color = 'white'
      div.style.background = 'rgba(0,0,0,.7)'
      document.body.append(div)
    } else {
      document.body.removeChild(document.getElementById('loading'))
    }
  }
})
Vue.prototype.$dialog = Dialog
Vue.prototype.sessionMethods = sessionMethods
Vue.prototype.localMethods = localMethods
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
