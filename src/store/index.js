import Vue from 'vue'
import Vuex from 'vuex'
import sessionMethods from '../plugins/sessionStorage'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    User: {

    },
    playList: {

    }

  },
  mutations: {
    GETISLOGIN (state, status) {
      state.isLogin = status
    },
    GETUSERINFO (state, user) {
      state.User = user
    },
    GETPLAYLIST (state, playlist) {
      state.playList = playlist
    }
  },
  actions: {
    getIsLogin ({ commit }) {
      commit('GETISLOGIN', sessionMethods.getSession('isLogin'))
    },
    getUserInfo ({ commit }) {
      commit('GETUSERINFO', sessionMethods.getSession('UserInfo'))
    },
    getPlayList ({ commit }) {
      commit('GETPLAYLIST', sessionMethods.getSession('PlayList'))
    }

  },
  modules: {
  }
})
