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
      <van-tab title="每日推荐">
        <recommend imgurl="https://p2.music.126.net/PjmeANWOl67Q3HnG3vEFfw==/109951164221437658.jpg" title="网易云热评10w+的中文歌" text="根据你喜欢的歌单《华语‖一听就忍不住想哭的歌①》推荐"></recommend>
      </van-tab>
      <van-tab
        title="我的歌单"
        class="createlist"
      >
        <van-grid
          :column-num="3"
          square
          clickable
          icon-size="64px"
        >

          <van-grid-item
            v-for="item in playlist"
            :key="item.id"
          >
            <i>
              <img v-lazy="item.coverImgUrl" />
            </i>
            <span>{{item.name}}</span>
          </van-grid-item>

        </van-grid>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import recommend from '../../components/my/recommend'
export default {
  data () {
    return {
      active: '',
      userId: '',
      value: '',
      avatarUrl: '',
      playlist: [],
      phoneType: 1,
      bannerlist: [],
      loading: true
    }
  },
  components: {
    recommend
  },
  created () {
    // 初始话store
    this.storeInit()
    // this.getUserplayList()
    this.getSubscribe()
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
    },
    async getSubscribe () {
      const { data: res } = await this.$http.get('/recommend/resource', {
        withCredentials: true
      })
      console.log(res)
    }

  }
}
</script>

<style lang="less" scoped>
  img[lazy=loading] {
    background: gray;
    transition: all 0.3s;
  }
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
.createlist{
    .van-grid-item{

      i{
            position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 vant-icon;
        text-rendering: auto;
    -webkit-font-smoothing: antialiased;
        font-size:64px ;
        img{
            text-align: center;
            width: 1em;
            height: 1em;
            object-fit: contain;
        }
      }

      span{
        text-align: center;
    color: #646566;
    font-size: 12px;
    word-wrap: break-word;
    padding-top: 8px;

      }
    }
}
</style>
