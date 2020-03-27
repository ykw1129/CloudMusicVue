<template>
  <div id="my">
    <van-row class="search">
      <van-skeleton
        avatar
        :row="1"
        :loading="loading"
      >
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
      </van-skeleton>
    </van-row>
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      height="159"
    >
      <van-swipe-item
        v-for="item in bannerlist"
        :key="item.bannerId"
      >
        <van-image
          :src="item.pic"
          type="contain"
        />
      </van-swipe-item>
    </van-swipe>
    <van-tabs
      v-model="active"
      class="playlist-tabs"
    >
      <van-tab title="创建的歌单">
        <van-grid
          :column-num="3"
          square
          clickable
          icon-size="64px"
        >
          <van-grid-item
            v-for="item in playlist"
            :key="item.id"
            :icon="item.coverImgUrl"
            :text="item.name"
          ></van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="喜欢的歌单">
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: '标签 1',
      userId: '',
      value: '',
      avatarUrl: '',
      playlist: [],
      phoneType: 1,
      bannerlist: [],
      loading: true
    }
  },
  created () {
    // 初始话store
    this.storeInit()
    this.getUserplayList()

    // this.userId = this.$store.state.userId
  },
  methods: {
    // 获取用户歌单
    async getUserplayList () {
      const { data: res } = await this.$http.get('/user/playlist', {
        params: { uid: this.$store.state.userId }
      })
      console.log()
      console.log(res.playlist)
      this.playlist = res.playlist
      this.getBanner()
    },
    async getBanner () {
      const { data: res } = await this.$http.get('/banner', {
        params: { type: this.phoneType }
      })
      console.log(res)
      this.bannerlist = res.banners
      this.loading = false
    },
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
    },
    // 之所以这样获取是防止用户logo闪烁问题
    storeInit () {
      this.$store.dispatch('getUserID')
      this.$store.dispatch('getUserAvatar')
      this.avatarUrl = this.$store.state.avatarUrl
      this.userId = this.$store.state.userId
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
  padding: 8px;
  img{
    height: 100%;
    border-radius: 50%;
  }
}
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

.van-grid-item__text{
  text-align: center;
}
</style>
