<template>
  <div id="login">
    <h1>CloudMusic</h1>
    <div class="login-logo">
      <img
        src="../../assets/image/logo.jpg"
        alt="logo"
      >
    </div>
    <ValidationObserver>
 <van-form ref="LoginRef">
      <ValidationProvider rules="required|mobile" name="phone" v-slot="{ errors }">
      <van-field
        v-model="LoginForm.phone"
        label="手机号码"
        type="number"
        maxlength="11"
        placeholder="手机号码"
        :error-message="errors[0]"
      />
      </ValidationProvider>
      <ValidationProvider rules="required|password" name="password" v-slot="{ errors }">
      <van-field
        v-model="LoginForm.password"
        type="password"
        label="密码"
        maxlength="16"
        placeholder="密码"
        :error-message="errors[0]"
      />
      </ValidationProvider>
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
    </ValidationObserver>
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
      isLogin: false
    }
  },
  methods: {
    // 点击登录事件函数
    onClickLogin () {
      this.getLogin()
    },
    // 登录请求post请求
    async getLogin () {
      this.checkForm()
      const { data: res } = await this.$http.post(
        '/login/cellphone', { phone: this.LoginForm.phone, password: this.LoginForm.password }, { withCredentials: true }
      )
      console.log(res)
      if (res.code !== 200) return this.$notify({ type: 'danger', message: '账号或密码错误！' })
      else {
        this.$notify({
          type: 'success',
          message: `${res.profile.nickname} 欢迎回来！`
        })
        this.isLogin = true
        console.log(res)
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      }
    },
    checkForm () {
    },
    // 登陆失败处理逻辑
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
