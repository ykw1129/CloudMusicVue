<template>
  <div id="my">
    <van-row class="search">
      <van-col span="3">
        <img
          :src="avatarUrl"
          alt="user-icon"
        >
      </van-col>
      <van-col span="21">
        <van-search
          v-model="value"
          shape="round"
          background="rgb(235,32,0)"
          placeholder="请输入歌曲，歌手，专辑"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: '',
      value: '',
      avatarUrl: ''

    }
  },
  created () {
    this.storeAvatarUrl()
    // this.userId = this.$store.state.userId
  },
  methods: {
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    async  getUserPlaylistStats () {
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
        params: { uid: this.userId, timestamp: Date.now(), withCredentials: true }
      })
      if (res.code !== 200) {
        return this.$notify({ type: 'danger', message: '账号或密码错误！' })
      } else {
        console.log(res)
        this.avatarUrl = res.profile.avatarUrl
      }
    },
    // 之所以这样获取是防止用户logo闪烁问题
    storeAvatarUrl () {
      this.$store.dispatch('getUserAvatar')
      this.avatarUrl = this.$store.state.avatarUrl
    }
  }
}
</script>

<style lang="less" scoped>
.search{
    background-color: rgb(235, 32, 0);
  height: 54px;
  overflow: hidden;
.van-col:nth-child(1){
  height: 100%;
  text-align: center;
  padding: 6px;
  img{
    height: 100%;
    border-radius: 50%;
  }
}
}

</style>
