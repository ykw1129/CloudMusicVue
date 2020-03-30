<template>
  <div id="mydetail">
    <van-nav-bar
      title=""
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      UserDetail: {
        name: '',
        userId: ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$toast('返回')
    },
    onClickRight () {
      this.$toast('按钮')
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
      }
    }
  }
}
</script>

<style>

</style>
