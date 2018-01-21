<template>
  <div class="login-wrap">
    <div class="w200 margin-auto bd-ccc px-padding-20" v-loading="loading">
      <input type="text" v-model.trim="name" @keyup.13="login">
      <input type="password" v-model.trim="pwd" @keyup.13="login">

      <div class="text-center">
        <a href="javascript:" class="btn px-btn btn-info px-margin-b10 px-font-14" @click="login">登录</a><br>
        <a href="#/" class="px-font-14">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
  import DB from '../assets/db'
  import utils from '../assets/utils'

  export default {
    data() {
      return {
        name: '',
        pwd: '',
        loading: false
      }
    },

    methods: {
      login() {
        if (!this.name || !this.pwd) {
          utils.alert.call(this, '请输入信息')
          return
        }

        this.loading = true
        DB.login(this.name, this.pwd).then(res=> {
          this.loading = false
          if (res.code) {
            utils.alert.call(this, res.error)
          } else {
            utils.alert.call(this, '登录成功', 'success')
            // this.$router.push('/editor')
            history.back()
          }
        }).then(res=> {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-wrap {
    padding-top: 200px;
  }
  input {
    width: 150px;
    border: 1px #333 solid;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 2px;
    padding: 0 15px;
    margin-bottom: 15px;
  }
</style>
