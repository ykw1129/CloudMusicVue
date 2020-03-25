import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import './plugins/rules'
import './plugins/vant'
import './plugins/cancel'
// import vant from 'vant'
extend('required', required)
extend('email', email)
// 设置
axios.defaults.baseURL = 'http://localhost:3000'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
