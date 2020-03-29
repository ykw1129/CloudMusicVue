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
    <myswipe />
    <van-tabs
    @rendered="getChange"
      v-model="active"
      class="playlist-tabs"
    >
      <van-tab name="subscribe">
        <template #title>
          <van-icon name="good-job-o" size="15" color="rgb(235, 32, 0)" />
          &nbsp;
            <span>每日推荐</span>
        </template>
        <van-list
          v-model="loading"
          :error.sync="error"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
        >
          <template v-slot:default>
            <recommend
              :key="recommend.id"
              v-for="recommend in recommendlist"
              :imgurl="recommend.picUrl"
              :title="recommend.name"
              :text="recommend.copywriter"
              :username="recommend.creator.nickname"
              :userimg="recommend.creator.avatarUrl"
            ></recommend>
          </template>
        </van-list>
      </van-tab>
      <van-tab
        class="createlist"
        name="mylist"
      >
              <template #title>
          <van-icon name="like-o" size="15" color="rgb(235, 32, 0)" />
          &nbsp;
          <span>我的歌单</span>
        </template>
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
import myswipe from '../../components/my/myswipe'
export default {
  data () {
    return {
      active: 'subscribe',
      userId: '',
      value: '',
      avatarUrl: '',
      playlist: [],
      recommendlist: [],
      error: false,
      loading: true,
      finished: false
    }
  },
  components: {
    recommend,
    myswipe
  },
  created () {
    // 初始话store
    this.storeInit()
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
    // 每日推荐歌单
    async getSubscribe () {
      const { data: res } = await this.$http.get('/recommend/resource', {
        withCredentials: true
      })
      if (res.code !== 200) {
        this.loading = false
        this.error = true
      } else {
        this.loading = false
        this.finished = true
        this.recommendlist = res.recommend
        console.log(res)
      }
    },
    getChange (name, title) {
      if (name === 'subscribe') {
        this.getSubscribe()
      } else {
        this.getUserplayList()
      }
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
