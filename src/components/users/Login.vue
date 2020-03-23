<template>
  <div id="login">
    <div class="login-logo">
      <van-image
        width="100"
        height="100"
        fit="cover"
        round
        src="http://is3.mzstatic.com/image/thumb/Purple128/v4/f5/44/5a/f5445a87-4137-85ba-06d8-26d33e54d404/mzl.sqdgtzfe.png/512x512bb.jpg"
      />
    </div>
    <van-form>
      <van-field
        v-model="LoginForm.phone"
        label="手机号码"
        placeholder="手机号码"
        :rules="loginPhoneRules"
      />
      <van-field
        v-model="LoginForm.password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="loginPasswordRules"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="button"
          @click="onClickLogin()"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      LoginForm: {
        phone: '',
        password: ''
      },
      loginPhoneRules: [
        { required: true, message: '请填写手机号码' }
      ],
      loginPasswordRules: [
        { required: true, message: '请填写您的密码' }
      ],
      isLogin: false

    }
  },
  methods: {
    onClickLogin () {
      this.getLogin()
      this.loginToast()
    },
    async getLogin () {
      const { data: res } = await this.$http.post('/login/cellphone', this.LoginForm
      )
      if (res.code === 200) {
        this.$toast.success('登录成功')
        this.isLogin = true
      }
    },
    loginToast () {
      this.$toast({
        message: '加载中...',
        forbidClick: true
      })
      let seconds = 5
      const timer = setInterval(() => {
        seconds--
        if (seconds === 0 && this.isLogin === false) {
          this.$toast.fail('登陆失败')
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
#login{
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  justify-content: center;
  position: absolute;
  margin: auto;
  .login-logo{

}
}

</style>
