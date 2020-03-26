<template>
  <div id="my">
    <van-row class="search">
      <van-col span="3">
        <img
          :src="avaterUrl"
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
      value: '',
      avaterUrl: ''

    }
  },
  created () {

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

    },
    // 获取用户详情
    async getUserDetail () {

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
