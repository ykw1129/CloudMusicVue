import Vue from 'vue'
import Vuex from 'vuex'
import sessionMethods from '../plugins/sessionStorage'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    User: {

    }

  },
  mutations: {
    GETISLOGIN (state, status) {
      state.isLogin = status
    },
    GETUSERINFO (state, user) {
      state.User = user
    }
  },
  actions: {
    getIsLogin ({ commit }) {
      commit('GETISLOGIN', sessionMethods.getSession('isLogin'))
    },
    getUserInfo ({ commit }) {
      commit('GETUSERINFO', sessionMethods.getSession('UserInfo'))
    }

  },
  modules: {
  }
})
