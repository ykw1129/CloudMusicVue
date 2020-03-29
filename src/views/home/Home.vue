<template>
  <div>
     <router-view/>
     <div class="wrap">
       <van-tabbar v-model="active" route>
          <van-tabbar-item icon="home-o" to="/my" name="my">我的</van-tabbar-item>
          <van-tabbar-item icon="search" to="/find" name="find">发现</van-tabbar-item>
          <van-tabbar-item icon="friends-o" to="/village" name="village">云村</van-tabbar-item>
     </van-tabbar>
     </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'my'
    }
  },
  methods: {
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    async  getUserPlaylistStatus () {
      const { data: res } = await this.$http.get('/user/subcount', {
        params: { timestamp: Date.now() }, withCredentials: true
      })
      console.log(res)
    },
    // 获取用户登录状态
    async getUserStatus () {
      const { data: res } = await this.$http.get('/login/status', {
        params: { timestamp: Date.now() }, withCredentials: true
      })
      console.log(res)
    },
    // 获取用户详情
    async getUserDetail () {
      const { data: res } = await this.$http.get('/user/detail', {
        params: { uid: this.userId, timestamp: Date.now() }, withCredentials: true
      })
      if (res.code !== 200) {
        return this.$notify({ type: 'danger', message: '账号或密码错误！' })
      } else {
        console.log(res)
        this.avatarUrl = res.profile.avatarUrl
      }
    },
    // 获取热门话题
    async getHotTopic () {
      const { data: res } = await this.$http.get('/hot/topic', {
        params: { limit: 30, offset: 30 }, withCredentials: true
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
.wrap{
  height: 50px;
}
</style>
