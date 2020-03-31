import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import sessionMethods from './plugins/sessionStorage'
import './plugins/rules'
import './plugins/vant'
import './plugins/interceptors'
// import vant from 'vant'
extend('required', required)
extend('email', email)
// 设置
axios.defaults.baseURL = 'http://localhost:3000'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padEnd(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.prototype.sessionMethods = sessionMethods
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
