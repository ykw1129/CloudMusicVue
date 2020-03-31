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
    <div class="userbackground">
        <van-image :src="UserDetail.backgroundUrl" type="contain"/>
        <van-image class="user-logo" :src="UserDetail.avatarUrl" type="contain" round width="80" height="80" :alt="UserDetail.nickname" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
        console.log(res.createTime.toLocalString())
      }
    },
    detailInit () {
      this.UserDetail = this.$store.state.User
    }
  }
}
</script>

<style lang="less" scoped>
.userbackground{
  position: relative;
  .user-logo{
    position: relative;
    bottom: 50px;
    left: 40px;
  }
}
</style>
