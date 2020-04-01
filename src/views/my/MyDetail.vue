<template>
  <div id="mydetail">
    <van-nav-bar
      :title="UserDetail.nickname"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
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
        :style="{background:'url('+UserDetail.backgroundUrl+') no-repeat'}"
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
          </div>
        </div>

      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="个人信息">
        <van-list
          v-model="isDetailLoading"
          :finished="isDetailFinished"
          finished-text="没有更多了"
        >
          <van-cell title="昵称" :value="UserDetail.nickname"/>
          <van-cell title="等级" value="UserDetailList.level" />
           <van-cell title="" value="内容" />
            <van-cell title="单元格" value="内容" />
             <van-cell title="单元格" value="内容" />
              <van-cell title="单元格" value="内容" />
        </van-list>
      </van-tab>
      <van-tab title="动态">
        <van-list
          v-model="isDynamicLoading"
          :finished="isDynamicFinished"
          finished-text="没有更多了"
        >

        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      active: '',
      UserDetail: {

      },
      UserDetailList: {
        level: '',
        listenSongs: '',
        createTime: '',
        birthday: '',
        signature: '',
        nickname: ''
      },
      isDetailLoading: false,
      isDetailFinished: false,
      isDynamicFinished: false,
      isDynamicLoading: false

    }
  },
  created () {
    this.detailInit()
    this.getUserDetail()
  },
  methods: {
    onClickLeft () {

    },
    onClickRight () {

    },
    // 获取用户详情
    async getUserDetail () {
      const { data: res } = await this.$http.get('/user/detail', {
        params: { uid: this.UserDetail.userid, timestamp: Date.now() }, withCredentials: true
      })
      if (res.code !== 200) {
        return this.$notify({ type: 'danger', message: '获取用户资料失败' })
      } else {
        this.nickname = res.nickname
        this.level = res.level
        this.listenSongs = res.listenSongs
        this.createTime = res.createTime
        this.birthday = res.profile.birthday
        this.signature = res.profile.signature
      }
    },
    detailInit () {
      this.UserDetail = this.$store.state.User
    }
  }
}
</script>

<style lang="less" scoped>
.user-detail{
  height: 412px;
  .user-background{
    background-size: 100%;
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
        padding: 4px 0;
      }
      .user-follow{
        padding: 4px 0;
      span{
      }
      span:nth-child(1){
        padding-right: 8px;
        border-right: 1px #ffffff solid ;
      }
      span:nth-child(2){
       padding-left: 8px;
      }
      .user-signature{
        padding: 4px 0;
      }
      }
    }
  }
}
</style>
