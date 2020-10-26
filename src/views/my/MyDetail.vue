<template>
  <div id="mydetail">
    <van-nav-bar
      :title="UserDetail.nickname"
      left-arrow
    >
      <template #left>
          <van-icon
            @click="back"
            name="arrow-left"
            size="18"
            color="rgb(235, 32, 0)"
          />
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
        <div class="user-info" v-cloak>
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
    <van-tabs
      v-model="active"
      @rendered="onListChange"
    >
      <van-tab
        title="个人信息"
        name="detail"
      >
        <van-pull-refresh
          v-model="isDetailRefreshLoading"
          @refresh="getDetail"
        >
          <van-list
            v-model="isDetailLoading"
            :finished="isDetailFinished"
            finished-text="没有更多了"
          >
            <van-cell
              title="昵称"
              :value="UserDetailList.nickname"
            />
            <van-cell
              title="等级"
              :value="UserDetailList.level"
            />
            <van-cell
              title="个性签名"
              :value="UserDetailList.signature"
            />
            <van-cell
            v-cloak
              title="生日"
              :value="UserDetailList.birthday|dateFormat"
            />
            <van-cell
            v-cloak
              title="创建日期"
              :value="UserDetailList.createTime|dateFormat"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab
        title="动态"
        name="event"
      >
        <van-pull-refresh
          v-model="isEventRefreshLoading"
          @refresh="getRefreshUserEvent"
        >
          <van-list
            v-model="isEventLoading"
            :finished="isEventFinished"
            finished-text="没有更多了"
          >
            <eventswitch
              v-for="event in events"
              :imgUrl="event.imgUrl"
              :urlId="event.id"
              :key="event.id"
              :des="event.des"
              :componentName="event.name"
              :bycreator="event.bycreator"
              :creator="event.nickname"
              :eventTime="event.eventTime"
              :eventTypecode="event.type"
              :avatarUrl="event.creatorAvatarUrl"
              :msg = "event.msg"
              :actName="event.actName"
              :content="event.content"
            ></eventswitch>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserDetail, getUserEvent } from '@/api/user'
import eventswitch from '../../components/my/eventswitch.vue'
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
    eventswitch
  },
  computed: {

  },
  created () {
    this.detailInit()
  },
  methods: {
    // 获取用户详情
    async getDetail () {
      const { data: res } = await getUserDetail(this.UserDetail.userid, { withCredentials: true })
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
        console.log('获取用户详情', res)
        this.isDetailLoading = false
        this.isDetailFinished = true
        this.isDetailRefreshLoading = false
      }
    },
    async getEvent () {
      const { data: res } = await getUserEvent({ id: this.UserDetail.userid, limit: this.enventSize })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取用户动态失败' })
      } else {
        console.log('获取用户动态', res)
        for (let i = 0; i < res.events.length; i++) {
          this.events.push(JSON.parse(res.events[i].json))
          switch (res.events[i].type) {
            case 18:
              this.events[i].type = 'song'
              this.events[i].des = '分享单曲'
              this.events[i].id = this.events[i][this.events[i].type].id
              this.events[i].imgUrl = this.events[i][this.events[i].type].img80x80
              this.events[i].name = this.events[i][this.events[i].type].name
              this.events[i].bycreator = this.events[i][this.events[i].type].artists.map((item) => { return item.name }).join('/')
              break
            case 19:
              this.events[i].des = '分享专辑'
              this.events[i].type = 'album'
              this.events[i].id = this.events[i][this.events[i].type].id
              this.events[i].name = this.events[i][this.events[i].type].name
              this.events[i].imgUrl = this.events[i][this.events[i].type].img80x80
              this.events[i].bycreator = this.events[i][this.events[i].type].artist.name
              break
            case 17: case 28:
              this.events[i].des = '分享电台'
              this.events[i].type = 'djRadio'
              this.events[i].id = this.events[i][this.events[i].type].id
              this.events[i].name = this.events[i][this.events[i].type].name
              this.events[i].imgUrl = this.events[i][this.events[i].type].img80x80
              this.events[i].bycreator = this.events[i][this.events[i].type].dj.nickname
              break
            case 22:
              this.events[i].des = '转发'
              this.events[i].type = 'event'
              this.events[i].actName = this.events[i][this.events[i].type].actName
              this.events[i].bycreator = this.events[i][this.events[i].type].user.nickname
              this.events[i].id = this.events[i][this.events[i].type].id
              this.events[i].content = JSON.parse(this.events[i][this.events[i].type].json).msg
              this.events[i].imgUrl = this.events[i][this.events[i].type].pics[0].originUrl
              break
            case 39:
              this.events[i].des = '发布视频'
              this.events[i].type = 'releasevideo'
              this.events[i].id = this.events[i][this.events[i].type].id
              break
            case 35: case 13:
              this.events[i].des = '分享歌单'
              this.events[i].type = 'playlist'
              this.events[i].name = this.events[i][this.events[i].type].name
              this.events[i].imgUrl = this.events[i][this.events[i].type].coverImgUrl
              this.events[i].bycreator = this.events[i][this.events[i].type].creator.nickname
              this.events[i].id = this.events[i][this.events[i].type].id
              break
            case 24:
              this.events[i].des = '分享专栏'
              this.events[i].type = 'specialcolumn'
              this.events[i].id = this.events[i][this.events[i].type].id
              break
            case 41: case 21:
              this.events[i].des = '分享视频'
              this.events[i].type = 'myvideo'
              this.events[i].id = this.events[i][this.events[i].type.substr(2)].videoId
              break
          }
          this.events[i].eventTime = res.events[i].eventTime
          this.events[i].nickname = res.events[i].user.nickname
          this.events[i].creatorAvatarUrl = res.events[i].user.avatarUrl
        }
        console.log('获取用户动态事件', this.events)

        this.isEventLoading = false
        this.isEventFinished = true
        this.isEventRefreshLoading = false
      }
    },
    getRefreshUserEvent () {
      this.events = []
      this.getEvent()
    },
    // 初始化vuex
    detailInit () {
      this.UserDetail = this.$store.state.User
    },
    onListChange (name, title) {
      if (name === 'detail') {
        this.getDetail()
      } else {
        this.getEvent()
      }
    },
    back () {
      history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.user-detail{
  height: 10rem;
  .user-background{
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 0;
    height: 10rem;
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
    bottom: 5rem;
    z-index: 2;
    left: 0.8rem;
    .user-info{
      padding-top: 0.16rem;
      color:#ffffff;
      word-wrap: break-word;
      font-size: 0.3rem;
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
