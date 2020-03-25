<template>
  <div id="login">
    <h1>CloudMusic</h1>
    <div class="login-logo">
      <img
        src="../../assets/image/logo.jpg"
        alt="logo"
      >
    </div>
    <van-form ref="LoginRef">
      <van-field
        v-model="LoginForm.phone"
        label="手机号码"
        :name="phone"
        placeholder="手机号码"
        :rules="loginPhoneRules"
      />
      <van-field
        v-model="LoginForm.password"
        type="password"
        label="密码"
        :name="password"
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
        <div class="register-info">
          <router-link to="/register">没有账号？注册一下吧</router-link>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      password: '',
      LoginForm: {
        phone: '',
        password: ''
      },
      regMobile: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      loginPhoneRules: [
        { required: true, message: '请填写手机号码', trigger: 'onChange' },
        {
          validator: this.checkMobile,
          message: '请输入正确的手机号码',
          trigger: 'onBlur'
        }
      ],
      loginPasswordRules: [
        { required: true, message: '请填写您的密码', trigger: 'onChange' },
        {
          validator: this.checkPassword,
          message: '密码长度应该在6-16个字符之间',
          trigger: 'onBlur'
        }
      ],
      isLogin: false
    }
  },
  methods: {
    // 点击登录事件函数
    onClickLogin () {
      this.getLogin()
      this.loginToast()
    },
    // 登录请求post请求
    async getLogin () {
      const { data: res } = await this.$http.post(
        '/login/cellphone',
        this.LoginForm
      )
      if (res.code === 200) {
        this.$notify({
          type: 'success',
          message: `登录成功!${res.profile.signature} 欢迎回来！`
        })
        this.isLogin = true
        console.log(res)
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      }
    },
    // 登陆失败处理逻辑
    loginToast () {
      this.$toast.loading('正在登录...')
      let seconds = 5
      const timer = setInterval(() => {
        seconds--
        if (seconds === 0 && this.isLogin === false) {
          this.$notify({
            type: 'danger',
            message: '登陆失败！'
          })
          clearInterval(timer)
        }
      }, 1000)
    },
    // 手机号码的验证
    checkMobile (val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')

        setTimeout(() => {
          this.$toast.clear()
          resolve(this.regMobile.test(val))
        }, 100)
      })
    },
    // 密码的验证
    checkPassword (val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          if (val.length < 3 || val.length > 16) {
            resolve(false)
          } else {
            return null
          }
        }, 100)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  text-align: center;
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
  h1 {
    margin-bottom: 2%;
    color: gray;
  }
  .login-logo {
    margin: 50px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .register-info {
    margin: 30px;
    a {
      color: gray;
    }
  }
}
</style>
