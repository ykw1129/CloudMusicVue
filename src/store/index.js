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
      currentSongAuthor: '',
      currentIndex: '',
      currentSongImgUrl: '',
      currentSongUrl: '',
      currentSongAlbum: '',
      list: [],
      status: true
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
      const result = []
      const obj = {}
      for (let i = 0; i < state.playList.list.length; i++) {
        state.playList.list[i].index = i + 1
        if (!obj[state.playList.list[i].songId]) {
          result.push(state.playList.list[i])
          obj[state.playList.list[i].songId] = true
        }
      }
      state.playList.list = result
      state.playList.status = true
      state.playList.playState = true
      state.playList.currentSongAuthor = list.songAuthor
      state.playList.currentSongImgUrl = list.songImgUrl
      state.playList.currentSongUrl = list.songUrl
      state.playList.currentSongAlbum = list.songAlbum
      state.playList.currentIndex = list.index
      state.playList.currentSong = list.songName
      localMethods.setLocal('playList', state.playList)
    },
    // 获取音乐播放列表
    GETPLAYLIST (state) {
      state.playList = localMethods.getLocal('playList')
      if (state.playList.status) {
        state.playList.playState = true
        state.playList.status = false
      } else {
        state.playList.playState = false
        state.playList.status = false
      }
    },
    // 切换歌曲
    CHANGESONG (state, currentPlayIndex) {
      state.playList.currentIndex = currentPlayIndex
      state.playList.currentSong = state.playList.list[currentPlayIndex].songName
      state.playList.currentSongAuthor = state.playList.list[currentPlayIndex].songAuthor
      state.playList.currentSongImgUrl = state.playList.list[currentPlayIndex].songImgUrl
      state.playList.currentSongUrl = state.playList.list[currentPlayIndex].songUrl
      state.playList.currentSongAlbum = state.playList.list[currentPlayIndex].songAlbum
      localMethods.setLocal('playList', state.playList)
    },
    // 修正播放列表,删除链接为null的歌曲
    FIXPLAYERURLLIST (state) {
      state.playList.list.splice(state.playList.currentIndex, 1)
      localMethods.setLocal('playList', state.playList)
    },
    // 关掉音乐
    STOPPLAYER (state) {
      state.playList.playState = false
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
    },
    getPlayList ({ commit }) {
      commit('GETPLAYLIST', localMethods.getLocal('playList'))
    }

  },
  modules: {
  }
})
