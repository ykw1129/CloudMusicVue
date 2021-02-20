<template>
  <div id="my">
    <transition name="fade">
    <router-view />
    </transition>
    <div class="my-hone" v-if="this.$route.meta.show">

    <van-row class="search">
      <van-col span="3">
        <router-link to="/mydetail" name="my">
        <img
          :src="avatarUrl"
          alt="user-icon"
        >
        </router-link>
      </van-col>
      <van-col span="21">
        <van-search
          v-model="searchValue"
          shape="round"
          @search="onSearch"
          @cancel="onCancel"
          @focus="onFocus"
          @blur="onBlur"
          background="rgb(235,32,0)"
          placeholder="请输入歌曲，歌手，专辑"
        />
      </van-col>
    </van-row>
    <hot-List :isHide="hotlistShow" :List="hotList" ></hot-List>
    <my-Swipe />
    <van-tabs
      @rendered="onSubscribeChange"
      v-model="active"
      class="playlist-tabs"
    >
      <van-tab name="subscribe">
        <template #title>
          <van-icon
            name="good-job-o"
            size="15"
            color="rgb(235, 32, 0)"
          />
          &nbsp;
          <span>每日推荐</span>
        </template>
        <van-pull-refresh
          v-model="isSubscribeLoading"
          @refresh="onSubscribeRefresh"
          success-text="刷新成功"
        >
          <van-list
            v-model="subscribeLoading"
            :error.sync="subscribeError"
            :finished="subscribeFinished"
            loading-text="正在努力加载中"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
          >
            <template v-slot:default>
              <recommend
                :id ="recommend.id"
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
        </van-pull-refresh>
      </van-tab>
      <van-tab
        class="createlist"
        name="mylist"
      >
        <template #title>
          <van-icon
            name="like-o"
            size="15"
            color="rgb(235, 32, 0)"
          />
          &nbsp;
          <span>我的歌单</span>
        </template>
        <van-pull-refresh
          v-model="isPlaylistLoading"
          @refresh="onPlaylistRefresh"
          success-text="刷新成功"
        >
          <van-list
            v-model="playlistLoading"
            :error.sync="playlistError"
            :finished="playlistFinished"
            loading-text="正在努力加载中"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
          >
            <template v-slot:default>
              <van-grid
                :column-num="3"
                square
                clickable
                icon-size="64px"
              >

                <van-grid-item
                @click="toPlayList(item.id)"
                  v-for="item in playlist"
                  :key="item.id"
                >
                  <i>
                    <img
                      v-lazy="item.coverImgUrl"
                      :alt="item.name"
                    />
                  </i>
                  <span>{{item.name}}</span>
                </van-grid-item>

              </van-grid>
            </template>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
import { getEasyHotListSearch } from '../../api/search'
import { getSubscribePlayList, getUserCreatePlayList } from '@/api/playlist'
import recommend from '../../components/my/recommend'
import mySwipe from '../../components/my/my-swipe'
import hotList from '../../components/my/hot-list'
export default {
  data () {
    return {
      hotList: [],
      hotlistShow: true,
      active: 'subscribe',
      userId: '',
      searchValue: '',
      avatarUrl: '',
      playlist: [],
      recommendlist: [],
      subscribeError: false,
      subscribeLoading: false,
      isSubscribeLoading: false,
      subscribeFinished: false,
      playlistError: false,
      playlistLoading: false,
      isPlaylistLoading: false,
      playlistFinished: false
    }
  },
  computed: {
    // toggleShow: function () { return this.$route.meta.show }
  },
  components: {
    recommend,
    mySwipe,
    hotList
  },
  created () {
    // 初始化store
    this.storeInit()
  },
  methods: {
    // 获取用户歌单
    async getUserPlayList () {
      const { data: res } = await getUserCreatePlayList(this.$store.state.User.userid)
      if (res.code !== 200) {
        this.playlistLoading = false
        this.playlistError = true
      }
      this.playlistLoading = false
      this.playlistFinished = true
      this.playlist = res.playlist
    },
    // 之所以这样获取是防止用户logo闪烁问题
    storeInit () {
      this.$store.dispatch('getUserInfo')
      this.$store.dispatch('getIsLogin')
      this.avatarUrl = this.$store.state.User.avatarUrl
      this.userId = this.$store.state.User.userId
    },
    // 每日推荐歌单
    async getSubscribe () {
      const { data: res } = await getSubscribePlayList()
      if (res.code !== 200) {
        this.subscribeLoading = false
        this.subscribeError = true
      } else {
        this.subscribeLoading = false
        this.subscribeFinished = true
        this.recommendlist = res.recommend
      }
    },
    // 推荐歌单改变
    onSubscribeChange (name, title) {
      if (name === 'subscribe') {
        this.getSubscribe()
      } else {
        this.getUserPlayList()
      }
    },
    // 推荐歌单刷新
    onSubscribeRefresh () {
      this.getSubscribe()
      this.isSubscribeLoading = false
    },
    // 歌单刷新
    onPlaylistRefresh () {
      this.getUserPlayList()
      this.isPlaylistLoading = false
    },
    // 进入歌单详细页面
    toPlayList (id) {
      this.$router.push({ name: 'PlayList', params: { id: id } })
    },
    // 点击查询或点击回车键
    onSearch (e) {
      console.log(e)
    },
    // focus搜索框
    onFocus () {
      this.hotlistShow = !this.hotlistShow
      this.getHotList()
    },
    // focus搜索框
    onBlur () {
      this.hotlistShow = !this.hotlistShow
    },
    // 取消搜索框
    onCancel (e) {
      console.log(e)
    },
    async getHotList () {
      const { data: res } = await getEasyHotListSearch()
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取热搜列表失败' })
      } else {
        this.hotList = res.result.hots
      }
    }
  }
}
</script>

<style lang="less" scoped>

.van-cell{
  font-size: 0.4rem;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-enter{
  opacity: 0;
}
 img[lazy=loading] {
    background: gray;
    transition: all 0.3s;
}

.search {
    background-color: rgb(235, 32, 0);
    height: 1.2rem;
    overflow: hidden;
    .van-col:nth-child(1) {
        height: 100%;
        text-align: center;
        padding: 0.08rem;

        img {
            height: 100%;
            border-radius: 50%;
        }
    }
    .van-col:nth-child(2){
      height: 100%;

    }
    /deep/ .van-field__body{
        height: 100%;
    }
    /deep/ .van-icon-search::before{
        font-size: 0.4rem;
    }
    /deep/ .van-field__left-icon{
      display: flex;
      margin-right: 0.2rem;
    }
    /deep/ .van-field__left-icon .van-icon{
      display: inline;
      margin: auto;
      line-height:1
    }
    /deep/ .van-cell.van-cell--borderless.van-field{
      padding: .1rem .16rem;
    }
}

.createlist {
    .van-grid-item {
        i {
            position: relative;
            display: inline-block;
            font: normal normal normal 0.14rem/1 vant-icon;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            font-size: 0.64rem;

            img {
                text-align: center;
                width: 2em;
                height: 2em;
                object-fit: contain;
            }
        }

        span {
            text-align: center;
            color: #646566;
            font-size: 0.4rem;
            word-wrap: break-word;
            padding-top: 0.3rem;

        }
    }
}
.van-search{
  height: 100%;
}
</style>
