import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import sessionMethods from '../plugins/sessionStorage'
axios.defaults.baseURL = 'http://localhost:3000'
// import localMethods from '../plugins/localStorage'
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
      list: []
    }

  },
  getters: {
    // 将播放列表中的音乐url设置成vue-audio-player适合的数组形式
    getAudioPlayerUrlList: (state) => {
      const arr = []
      state.playList.list.forEach((item) => {
        arr.push(item.songUrl)
      })
      return arr
    }
  },
  mutations: {
    GETISLOGIN (state, status) {
      state.isLogin = status
    },
    GETUSERINFO (state, user) {
      state.User = user
    },
    TOPLAYLIST (state, list) {
      state.playList.list.unshift(list)
      state.playList.playState = true
      state.playList.currentIndex = 0
    }
  },
  actions: {
    getIsLogin ({ commit }) {
      commit('GETISLOGIN', sessionMethods.getSession('isLogin'))
    },
    getUserInfo ({ commit }) {
      commit('GETUSERINFO', sessionMethods.getSession('UserInfo'))
    },
    toPlayList ({ commit }, list) {
      commit('TOPLAYLIST', list)
    }

  },
  modules: {
  }
})
