<template>
  <div>
    <router-view />
    <div class="wrap">
      <van-tabbar
        v-model="active"
        route
        active-color="rgb(235, 32, 0)"
        @change="setTabbarActive"
      >
        <van-tabbar-item
          :style="active=='my'?'color: rgb(235, 32, 0);':''"
          replace
          icon="home-o"
          to="/my"
          name="my"
        >我的</van-tabbar-item>
        <van-tabbar-item
        replace
          icon="search"
          to="/find"
          name="find"
        >发现</van-tabbar-item>
        <van-tabbar-item
        replace
          icon="friends-o"
          to="/village"
          name="village"
        >云村</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  },
  created () {
    this.setTabbarActive()
    this.getTabbarActive()
  },
  methods: {
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    async  getUserPlaylistStatus () {
      const { data: res } = await this.$http.get('/user/subcount', {
        params: { timestamp: Date.now() }, withCredentials: true
      })
      console.log('获取用户信息 , 歌单，收藏，mv, dj 数量', res)
    },
    // 获取用户登录状态
    async getUserStatus () {
      const { data: res } = await this.$http.get('/login/status', {
        params: { timestamp: Date.now() }, withCredentials: true
      })
      console.log('获取用户登录状态', res)
    },
    // 获取热门话题
    async getHotTopic () {
      const { data: res } = await this.$http.get('/hot/topic', {
        params: { limit: 30, offset: 30 }, withCredentials: true
      })
      console.log('获取热门话题', res)
    },
    setTabbarActive (act) {
      this.sessionMethods.setSession('TabbarActive', this.active)
    },
    getTabbarActive () {
      this.active = this.sessionMethods.getSession('TabbarActive')
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
.van-tabbar{
  width: 100%;
  min-width: 320px;
  margin: auto;
  height:1.2rem;
  left: 50%;
  transform: translateX(-50%);
}
.van-tabbar-item{
  font-size: 0.3rem;
}
.van-icon{
  font-size: 0.3rem!important;
}

</style>
