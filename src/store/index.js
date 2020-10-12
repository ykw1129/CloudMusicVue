import Vue from 'vue'
import Vuex from 'vuex'
import sessionMethods from '../plugins/sessionStorage'
import localMethods from '../plugins/localStorage'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    User: {

    },
    playList: {
      playState: false,
      currentSong: '',
      currentIndex: '',
      list: [

      ]
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
      commit('GETPLAYLIST', localMethods.getLocal('PlayList'))
    }

  },
  modules: {
  }
})
