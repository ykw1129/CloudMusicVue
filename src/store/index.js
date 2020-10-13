import Vue from 'vue'
import Vuex from 'vuex'
import sessionMethods from '../plugins/sessionStorage'
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
        arr.unshift(item.songUrl)
      })
      return arr
    }
  },
  mutations: {
    // 获取是否登录信息
    GETISLOGIN (state, status) {
      state.isLogin = status
    },
    // 获取用户个人信息
    GETUSERINFO (state, user) {
      state.User = user
    },
    // 进入播放器
    TOPLAYLIST (state, list) {
      state.playList.list.unshift(list)
      // js数组中的对象去重
      var result = []
      var obj = {}
      for (var i = 0; i < state.playList.list.length; i++) {
        state.playList.list[i].index = i
        if (!obj[state.playList.list[i].songId]) {
          result.unshift(state.playList.list[i])
          obj[state.playList.list[i].songId] = true
        }
      }
      state.playList.list = result
      state.playList.playState = true
      state.playList.currentIndex = list.index
      state.playList.currentSong = list.songName
    },
    // 切换播放器状态
    PLAYSWITCH (state) {
      state.playList.playState = !state.playList.playState
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
