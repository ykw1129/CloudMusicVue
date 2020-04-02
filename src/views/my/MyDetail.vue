<template>
  <div id="mydetail">
    <van-nav-bar
      :title="UserDetail.nickname"
      left-arrow
    >
      <template #left>
        <router-link to="/my">
          <van-icon
            name="arrow-left"
            size="18"
            color="rgb(235, 32, 0)"
          />
        </router-link>
      </template>
      <template #right>
        <van-icon
          name="envelop-o"
          size="18"
          color="rgb(235, 32, 0)"
        />
      </template>
    </van-nav-bar>
    <div class="user-detail">
      <div
        class="user-background"
        :style="{backgroundImage:'url('+UserDetail.backgroundUrl+')'}"
      >

      </div>
      <div class="user-logo">
        <van-image
          Lazyload
          :src="UserDetail.avatarUrl"
          type="contain"
          round
          width="80"
          height="80"
          :alt="UserDetail.nickname"
        />
        <div class="user-info">
          <p>{{UserDetail.nickname}}</p>
          <div class="user-follow">
            <span>关注:{{UserDetail.follows}}</span>
            <span>粉丝:{{UserDetail.followeds}}</span>
          </div>
          <div class="user-signature">
            <p>{{UserDetail.signature}}</p>
            <p>来到网易云已经{{UserDetailList.createDays}}天了！</p>
          </div>
        </div>

      </div>
    </div>
    <van-tabs v-model="active" @rendered="onListChange">
      <van-tab title="个人信息" name="detail" >
        <van-pull-refresh v-model="isDetailRefreshLoading" @refresh="getUserDetail">
        <van-list
          v-model="isDetailLoading"
          :finished="isDetailFinished"
          finished-text="没有更多了"
        >
          <van-cell title="昵称" :value="UserDetailList.nickname"/>
          <van-cell title="等级" :value="UserDetailList.level" />
          <van-cell title="个性签名" :value="UserDetailList.signature" />
          <van-cell title="生日" :value="UserDetailList.birthday|dateFormat" />
          <van-cell title="创建日期" :value="UserDetailList.createTime|dateFormat" />
        </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="动态" name="event">
          <van-pull-refresh v-model="isEventRefreshLoading" @refresh="getUserEvent">
        <van-list
          v-model="isEventLoading"
          :finished="isEventFinished"
          finished-text="没有更多了"
        >
          <eventvideo></eventvideo>
        </van-list>
          </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import eventvideo from '../../components/my/eventvideo.vue'
export default {
  data () {
    return {
      show: true,
      active: 'detail',
      lasttime: '',
      enventSize: 30,
      events: [],
      UserDetail: {

      },
      UserDetailList: {
        level: '',
        listenSongs: '',
        createTime: '',
        birthday: '',
        signature: '',
        nickname: '',
        createDays: ''
      },
      eventContent: [],
      isDetailLoading: false,
      isDetailFinished: false,
      isEventFinished: false,
      isEventLoading: false,
      isDetailRefreshLoading: false,
      isEventRefreshLoading: false

    }
  },
  components: {
    eventvideo
  },
  created () {
    this.detailInit()
  },
  methods: {
    // 获取用户详情
    async getUserDetail () {
      const { data: res } = await this.$http.get('/user/detail', {
        params: { uid: this.UserDetail.userid, timestamp: Date.now() }, withCredentials: true
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取用户资料失败' })
      } else {
        this.UserDetailList = {
          nickname: res.profile.nickname,
          level: res.level,
          listenSongs: res.listenSongs,
          createTime: res.createTime,
          birthday: res.profile.birthday,
          signature: res.profile.signature,
          createDays: res.createDays
        }
        console.log(res)
        this.isDetailLoading = false
        this.isDetailFinished = true
        this.isDetailRefreshLoading = false
      }
    },
    async getUserEvent () {
      const { data: res } = await this.$http.get('/user/event', {
        params: { uid: this.UserDetail.userid, limit: this.enventSize }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取用户动态失败' })
      } else {
        console.log(res)
        for (let i = 0; i < res.events.length; i++) {
          this.events.push(JSON.parse(res.events[i].json))
        }
        console.log(this.events)
        /*         const eventkey = Object.keys(this.events[1])[1]
        console.log(this.events[1][eventkey]) */

        this.isEventLoading = false
        this.isEventFinished = true
        this.isEventRefreshLoading = false
        this.getUserEventContent()
      }
    },
    getUserEventContent () {
      this.events.forEach((value, index) => {
        // const eventType = Object.keys(this.events[index])[1]
        /*         switch (eventType) {
          case 'mv':
            console.log(123)
            break
          case 'events':
            console.log('这event')
        } */
      })
    },
    // 初始化vuex
    detailInit () {
      this.UserDetail = this.$store.state.User
    },
    onListChange (name, title) {
      if (name === 'detail') {
        this.getUserDetail()
      } else {
        this.getUserEvent()
      }
    },
    async getEvent () {

    }
  }
}
</script>

<style lang="less" scoped>
.user-detail{
  height: 412px;
  .user-background{
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 0;
    height: 412px;
    position: relative;
    &:after{
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: black;
    opacity: 0.2;
    z-index: 1;
    width: 100%;
    height: 100%;
}
    }
  position: relative;
  .user-logo{
    position: relative;
    bottom: 200px;
    z-index: 2;
    left: 40px;
    .user-info{
      padding-top: 8px;
      color:#ffffff;
      word-wrap: break-word;
      font-size: 0.6rem;
      p{
        font-weight: bold;
        padding: 6px 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 15rem;
      }
      .user-follow{
        padding: 6px 0;
      span{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 15rem;
      }
      span:nth-child(1){
        padding-right: 8px;
        border-right: 1px #ffffff solid ;
      }
      span:nth-child(2){
       padding-left: 8px;
      }
      .user-signature{
        padding: 6px 0;
      }
      }
    }
  }
}
</style>
