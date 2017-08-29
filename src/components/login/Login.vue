<template>
  <div class="login-wrapper">
    <div class="login-bg"></div>
    <div class="dialog-wrapper">
      <div class="msg-wrapper">使用家里的群晖账号密码登录</div>
      <div class="login-input-wrapper">
        <el-form ref="loginForm" :model="loginForm">
          <el-form-item
            prop="account"
            :rules="[
            { required: true, message: '不能为空'}
          ]">
            <el-input class="login-input" v-model="loginForm.account" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item
            prop="passwd"
            :rules="[{required: true, message: '不能为空'}]"
          >
            <el-input class="login-input" type="password" v-model="loginForm.passwd" placeholder="密码"
                      required></el-input>
          </el-form-item>

          <el-form-item
            prop="synoKey"
            :rules="[{required: true, message: '不能为空'}]"
          >
            <el-input class="login-input" v-model="loginForm.synoKey" placeholder="在local端配置的Key" required></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="submit('loginForm')">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          account: '',
          passwd: '',
          synoKey: ''
        }
      }
    },
    methods: {
      submit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('验证通过', this.loginForm)
            if (!this.$store.state.syno.isInitDS) {
              this.$store.dispatch('initDS')
            }
            this.$store.dispatch('login', this.loginForm)
          } else {
            console.log('error submit')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .msg-wrapper {
    color: #fff;
    margin: 10px 0;
  }

  .login-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-bg {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    /*background: #fff;*/
    width: 100%;
    height: 100%;
  }

  .dialog-wrapper {
    width: 350px;
    height: 300px
  }

  .login-input {
    /*margin: 10px 0;*/
  }


</style>
