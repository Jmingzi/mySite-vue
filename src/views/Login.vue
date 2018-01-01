<template>
  <div class="w200 login-wrap bd-ccc px-padding-20">
    <input type="text" v-model.trim="name" @keyup.13="login">
    <input type="password" v-model.trim="pwd" @keyup.13="login">

    <div class="text-center">
      <a href="javascript:" class="btn px-btn btn-info" @click="login">登录</a>
    </div>
  </div>
</template>

<script>
  import DB from '../assets/db'

  export default {
    data() {
      return {
        name: '',
        pwd: ''
      }
    },
    methods: {
      login() {
        if (!this.name || !this.pwd) {
          alert('请输入信息')
          return
        }

        DB.login(this.name, this.pwd).then(res=> {
          if (res.code) {
            alert(res.error)
          } else {
            this.$router.push('/editor')
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
    margin: 200px auto;
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
