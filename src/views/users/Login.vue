<template>
  <div id="login">
    <h1>CloudMusic</h1>
    <div class="login-logo">
      <img
        src="../../assets/image/logo.jpg"
        alt="logo"
      >
    </div>
    <ValidationObserver ref="LoginRef">
  <van-form >
      <ValidationProvider rules="required|mobile" name="phone" v-slot="{ errors }">
      <van-field
        v-model="LoginForm.phone"
        label="手机号码"
        type="number"
        maxlength="11"
        name="phone"
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
        name="password"
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
          @click="getLogin"
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
import { login } from '@/api/user'
export default {
  data () {
    return {
      LoginForm: {
        phone: '',
        password: ''
      }
    }
  },
  created () {
    this.sessionMethods.setSession('isLogin', false)
  },
  methods: {
    // 登录请求post请求
    getLogin () {
      this.$refs.LoginRef.validate().then(async response => {
        if (response) {
        // 验证通过
          const { data: res } = await login({ phone: this.LoginForm.phone, password: this.LoginForm.password, timestamp: Date.parse(new Date()) }, { withCredentials: true })
          if (res.code !== 200) {
            this.$notify({ type: 'danger', message: '账号或密码错误！' })
            this.LoginForm.password = null
          } else {
            this.$notify({
              type: 'success',
              message: `${res.profile.nickname} 欢迎回来！`
            })
            const UserInfo = {
              userid: res.profile.userId,
              avatarUrl: res.profile.avatarUrl,
              nickname: res.profile.nickname,
              backgroundUrl: res.profile.backgroundUrl,
              followeds: res.profile.followeds,
              follows: res.profile.follows,
              signature: res.profile.signature
            }
            console.log('登录成功信息', res)
            this.sessionMethods.setSession('isLogin', true)
            this.sessionMethods.setSession('UserInfo', UserInfo)
            this.sessionMethods.setSession('token', res.token)
            this.$router.push('/home')
          }
        }
      })
    }
    // 登陆失败处理逻辑
    // 手机号码的验证
    /*     checkMobile (val) {
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
    } */
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
    font-size: 0.5rem;
  }
  .login-logo {
    margin: 1rem;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  }
  .register-info {
    margin: 30px;
    a {
      color: gray;
      font-size: 0.4rem;
    }
  }
  /deep/ .van-cell{
    padding: 0.2rem 0.32rem;
  }
  /deep/ .van-field__label{
    width: 1.5rem;
    margin-right: 0.24rem;
    span{
      font-size: 0.28rem;
    }
  }
  /deep/ .van-field__body{
    font-size: 0.28rem;
  }
  /deep/ .van-button{
    height: 0.88rem;
    font-size: 0.28rem;
  }
}
</style>
