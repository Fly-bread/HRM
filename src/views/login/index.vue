<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.phone"
          placeholder="手机号"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">账号: 13512345678</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validphone } from '@/utils/validate'
// 引入Vuex辅助函数
import { mapActions } from 'vuex'
import { Message } from 'element-ui'

import {testonline} from '@/api/user'
//import { getEmployeesList } from '@/api/employees'
// import axios from 'axios'
export default {
  name: 'Login',
  data() {
    const validatephone = (rule, value, callback) => {
      if (!validphone(value)) {
        callback(new Error('请输入正确格式的手机号码'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        phone: '13512345678',
        password: '123456'
      },
      loginRules: {
        phone: [{
          required: true, trigger: 'blur', message: '手机号不能为空'
        },
        {
          validator: validatephone, trigger: 'blur'
        }],
        password: [{
          required: true, trigger: 'blur', message: '密码不能为空'
        },
        {
          trigger: 'blur', min: 6, max: 18, message: '密码的长度不能小于6-18个字符之间'
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  created(){
    // signIn('bigpig', 'Wangcong123!').then((data) => {
    //   let mytoken =  data.signInUserSession.accessToken.jwtToken
    //   // var mytoken = 'eyJraWQiOiJpZXNxK2V0VVg4c0hPXC9wb3pSajRVeU9lejFJRjFkMFd1dVNzcnRlb2cwQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmMTg2NTYyZC1hY2Q0LTQ4ODItODQ3Ni0wNmVjZWQwMzI2ZGMiLCJjb2duaXRvOmdyb3VwcyI6WyJ0ZXN0R3JvdXAiXSwiZXZlbnRfaWQiOiI0YzJmYzNkNy04ZjBiLTQ5MGEtOTBmYy1kMGU5MWQyZjI5MjYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjIwMjk1MTU5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfYzdRZDlueXpBIiwiZXhwIjoxNjIwMjk4NzU5LCJpYXQiOjE2MjAyOTUxNTksImp0aSI6ImY0ZjA5NDNkLWI3MWItNDE0MS1hZmIwLTg4ZTg1OGE1MDNiNSIsImNsaWVudF9pZCI6IjIxbGQ0N3NlMjMwbjB2aThqZG1xc25vMTFiIiwidXNlcm5hbWUiOiJiaWdwaWcifQ.QclyD_hfR_SUpwENAlCdD91patPgBCfwP060mGOTYXjA4zV_rzre-yUlY3c-3w_S3jWQgUzBuQ20R3L7Ot9vAn9PSvhTSwb0QuI5dPLiUe-JWQBWohdsKPPKFxzUGdNufhSjgka3cHLuT7TZyav4eKdVG4wwgSY1ejYYSjYnzpGwAX-6FfQ0anwftigFaLWlZvQu_9NCE6fZ4wRlfXvG9t9P9xX8XUemHjdCMX96lSS-iGmrNpTEh0A6iWUCkeJWEfGG7kFcayj3alhOgt3T-liYDGU1e3fBBJ_tyHqeFKDRN1FipxHmz-4YGWSp8iu-gISfVh3dZeiE1C-V-sAuYQ';
    //   handler({ 'token': mytoken }).then(function(claim) {
    //       console.log(claim);
    //   });   
    // })       
  },
  methods: {
    // 引入module的子模块
    ...mapActions(['user/login']),

    //点击眼睛，展示密码
    showPwd(row) {
      
      // if (this.passwordType === 'password') {
      //   this.passwordType = ''
      // } else {
      //   this.passwordType = 'password'
      // }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
            this.$router.push({
                name:'relaxDetails',
                params:{
                    id:row.id,
                    username:row.username
                }
            }
            )      
    },
    handleLogin() {
      console.log('9999')
      this.$refs.loginForm.validate(async valid => {
        console.log('888')
        let data = await testonline()
        console.log('777')
        console.log(data)
        // if (valid) {
        //   try {
        //     this.loading = true   
        //     await this['user/login'](this.loginForm)   //this.loginForm 
        //     //let result = await getEmployeesList()
        //     this.loading = false
        //     this.$router.push('/')
        //   } catch (error) {
        //     console.log(error)
        //     // this.$router.push({
        //     //     name:'relaxDetails',
        //     //      params:{
        //     //         id:row.id,
        //     //         username:row.username
        //     //     }
        //     // })           
        //     this.loading = false
        //   }
        // }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#407ffe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
   .el-form-item__error {
    color: #fff
  }
  .loginBtn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
}
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('~@/assets/common/login.jpg') no-repeat center;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
