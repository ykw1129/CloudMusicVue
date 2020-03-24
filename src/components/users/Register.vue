<template>
  <div>
      <div id="register">
    <h1>CloudMusic</h1>
    <div class="register-logo">
        <img src="../../assets/image/logo.jpg" alt="logo">
    </div>
    <van-form>
            <van-field
        v-model="registerForm.username"
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
        v-model="registerForm.password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="registerPasswordRules"
      />
      <div style="margin: 16px;">
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
export default {
  data () {
    return {
      registerForm: {
        phone: '',
        password: '',
        username: ''
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
      ]
    }
  },
  methods: {
    onClickRegister () {

    }, // 手机号码的验证
    checkMobile (val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')

        setTimeout(() => {
          this.$toast.clear()
          resolve(
            /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
              val
            )
          )
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
}
</style>
