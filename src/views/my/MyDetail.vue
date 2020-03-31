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
   <van-icon name="arrow-left" size="18" color="rgb(235, 32, 0)"/>
      </router-link>
    </template>
        <template #right>
       <van-icon name="envelop-o" size="18" color="rgb(235, 32, 0)" />
    </template>
    </van-nav-bar>
    <div class="user-detail">
      <div class="user-background">
          <van-image :src="UserDetail.backgroundUrl" type="cover" style="background:#000,"/>
      </div>
      <div class="user-logo">
          <van-image :src="UserDetail.avatarUrl" type="contain" round width="80" height="80" :alt="UserDetail.nickname" />
          <div class="user-info">
            <p>{{UserDetail.nickname}}</p>
            <div>
              <span>关注:{{UserDetail.follows}}</span>
              <span>粉丝:{{UserDetail.followeds}}</span>
              </div>
          </div>

      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="标签 1"></van-tab>
      <van-tab title="标签 2"></van-tab>
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

      }
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
        console.log(res)
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
  .user-background{
  }
  position: relative;
  .user-logo{
    position: relative;
    bottom: 200px;
    left: 40px;
    .user-info{
      padding-top: 8px;
      color:#303030;
      word-wrap: break-word;
      font-size: 0.6rem;
      font-weight: bold;
      span{
        color: #888;
      }
      span:nth-child(1){
        border-right: 1px #646566 solid ;
      }
    }
  }
}
</style>
