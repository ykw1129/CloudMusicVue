import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    status: ''
  },
  mutations: {
    setUserStatus (state, result) {
      state.userId = result.profile.userId
    }
  },
  actions: {
    getUserStatus (context) {
      Axios.get('/login/status', {
        params: { timestamp: Date.now() },
        withCredentials: true
      }).then((result) => {
        context.commit('setUserStatus', result)
      }).catch(() => {

      })
    }
  },
  modules: {
  }
})
