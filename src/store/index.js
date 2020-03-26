import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户id
    userId: '',
    // 是否登录
    isLogin: false,
    avaterUrl: ''

  },
  mutations: {
    GETISLOGIN (state, status) {
      state.isLogin = status
    },
    GETUSERID (state, id) {
      state.userId = id
    },
    GETUSERAVATER (state, url) {
      state.avaterUrl = url
    }
  },
  actions: {
    // 获取用户id
    getUserID ({ commit }) {
      commit('GETUSERID', window.sessionStorage.getItem('userid'))
    },
    getIsLogin ({ commit }) {
      commit('GETISLOGIN', window.sessionStorage.getItem('isLogin'))
    },
    getUserAvater ({ commit }, url) {
      commit('GETUSERAVATER', url)
    }

  },
  modules: {
  }
})
