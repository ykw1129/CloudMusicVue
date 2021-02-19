<template>
  <div>
      <div id="register">
    <h1>CloudMusic</h1>
    <div class="register-logo">
        <img src="../../assets/image/logo.jpg" alt="logo">
    </div>
    <van-form>
            <van-field
        v-model="registerForm.nickname"
        label="用户名"
        placeholder="用户名"
        :rules="registerUsernameRules"
      />
      <van-field
        v-model="registerForm.phone"
        label="手机号码"
        placeholder="手机号码"
        :rules="registerPhoneRules"
      />

      <van-field
        v-model="registerForm.captcha"
        label="验证码"
        placeholder="验证码"
        :rules="registerCaptchaRules"
       />
      <van-field
        v-model="registerForm.password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="registerPasswordRules"
      />
      <div style="margin: 16px;">
        <van-button v-if="captchaShow" ref="captcha_btn" @click="handleCaptchaBtn" hairline round style="margin:0.2rem 0;"  block class="captcha_btn" type="primary" native-type="button">{{captchaBtnTitle}}</van-button>
        <van-button
          round
          block
          type="info"
          native-type="button"
          @click="onClickRegister()"
        >
          注册
        </van-button>
        <div class="register-info">
         <router-link to="/login">已有账号？登录一下吧</router-link>
        </div>
      </div>
    </van-form>
  </div>
  </div>
</template>

<script>
import { getCaptcha, Register, getIsRegister } from '@/api/user'
export default {
  data () {
    return {
      seconds: 60,
      captchaBtnTitle: '获取短信验证码',
      captchaShow: false,
      registerForm: {
        phone: '',
        password: '',
        nickname: '',
        captcha: ''
      },
      registerPhoneRules: [

        { required: true, message: '请填写手机号码', trigger: 'onChange' },
        {
          validator: this.checkMobile,
          message: '请输入正确的手机号码',
          trigger: 'onBlur'
        }

      ],
      registerPasswordRules: [
        { required: true, message: '请填写您的密码', trigger: 'onChange' },
        {
          validator: this.checkPassword,
          message: '密码长度应该在6-16个字符之间',
          trigger: 'onBlur'
        }
      ],
      registerUsernameRules: [
        { required: true, message: '请填写您的用户名', trigger: 'onChange' }
      ],
      registerCaptchaRules: [
        { required: true, message: '请填写手机验证码', trigger: 'onChange' },
        {
          validator: this.checkCaptcha,
          message: '验证码长度为5个数字',
          trigger: 'onBlur'
        }
      ]
    }
  },
  methods: {
    // 点击注册
    async onClickRegister () {
      const { data: res } = await Register(this.registerForm)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '注册失败' })
      } else {
        this.$notify({ type: 'success', message: '注册成功,跳转登录' })
        this.$route.push('/login')
      }
    }, // 手机号码的验证
    checkMobile (val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          const phoneCheking = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(val)
          if (phoneCheking) {
            resolve(true)
            this.handleIsRegister(this.registerForm.phone)
          } else {
            resolve(false)
          }
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
    },
    // 验证码的验证
    checkCaptcha (val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          if (val.length !== 4) {
            resolve(false)
          } else {
            return null
          }
        }, 100)
      })
    },
    // 获取验证码
    async getCaptchaCode (phone) {
      const { data: res } = await getCaptcha({ phone })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取短信验证码失败' })
      } else {
        this.$notify({ type: 'success', message: '获取短信验证码成功！请查看手机' })
      }
    },
    // 倒计时处理
    captchaCountDown () {
      const that = this
      that.captchaBtnTitle = that.seconds + '秒'
      that.$refs.captcha_btn.classList.remove('van-button--primary')
      that.$refs.captcha_btn.disabled = true
      return new Promise((resolve, reject) => {
        const setTimer = setInterval(() => {
          that.seconds -= 1
          // 验证码倒计时每秒减一
          that.captchaBtnTitle = that.seconds + '秒'
          if (that.seconds <= 0) {
            // 如果小于1，文字改为重新获取验证码
            that.captchaBtnTitle = '重新获取验证码'
            resolve(setTimer)
          }
        }
        , 1000)
      })
    },
    // 获取验证码点击处理
    handleCaptchaBtn () {
      this.getCaptchaCode(this.registerForm.phone)
      this.captchaCountDown().then((time) => {
        clearInterval(time)
        // 验证码倒计时回复60秒
        this.seconds = 60
        // 按钮禁用状态接触
        this.$refs.captcha_btn.disabled = false
        // 改变按钮样式
        this.$refs.captcha_btn.classList.add('van-button--primary')
      })
    },
    // 判断是否注册
    async handleIsRegister (phone) {
      const { data: res } = await getIsRegister({ phone })
      if (res.code !== 200) {
        this.$notify({ type: 'success', message: '验证手机号失败，请检查网络' })
      } else {
        if (res.exist === 1) {
          this.$notify({ type: 'danger', message: '该用户已注册！' })
        } else {
          this.captchaShow = true
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
#register {
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
  .register-logo {
    margin: 50px;
    img{
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
  .captcha_btn{
    z-index: 999;
  }
  form{
    position: relative;
  }

}
</style>
