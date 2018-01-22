<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    class="width-100 height-100 text-center">
    <div class="ib-middle px-padding-tb80">
      <h1 class="font-bold name">Jmingzi</h1>
      <div class="description px-font-14 color-c999 px-margin-t10">
        <p>AD&打野</p>
      </div>
    </div>

    <div class="plan-article w650 margin-auto panel px-font-14 text-left bd-gray-lighter radius-3">
      <plane-item
        @updateList="getPlane"
        :planeList="planeList">
      </plane-item>

      <div class="font-bold px-font-16 bd-gray-lighter-t px-margin-t20">
        <div class="panel-title px-line-30 px-padding-lr10 px-font-12">
          <span><i class="el-icon-tickets"></i> 文章</span>
        </div>
        <p class="px-padding-15 hover-bg cursor-p" v-for="item in articleList" @click="toArticle(item)">
          <span class="fr px-font-14 color-c999">20{{item.time | format}}</span>
          <span>{{item.artical_title}}</span>
        </p>
        <p class="px-padding-15 hover-bg cursor-p bd-gray-lighter-t text-center" @click="$router.push('/read')">
          <i class="el-icon-more-outline"></i>
        </p>
      </div>
    </div>
    <p class="w650 margin-auto px-padding-t20 px-font-12">
      <template v-if="isAdmin">
        <a class="ib-middle px-margin-r20" href="#/add-plane"><i class="el-icon-document"></i> 添加计划</a>
        <a class="ib-middle px-margin-r20" href="#/editor"><i class="el-icon-edit-outline"></i> 写作模式</a>
        <a class="ib-middle" href="javascript:" @click="logOut"><i class="el-icon-refresh"></i> 退出登录</a>
      </template>
      <template v-else>
        <a class="ib-middle px-margin-r20" href="#/read"><i class="el-icon-edit-outline"></i> 阅读模式</a>
        <a class="ib-middle" href="#/login"><i class="el-icon-mobile-phone"></i> 登录</a>
      </template>
    </p>
  </div>
</template>

<script>
  import DB from '../assets/db'
  import utils from '../assets/utils'
  import PlaneItem from '../components/PlaneItem'

  export default {
    name: 'index',

    data() {
      return {
        loading: false,
        isAdmin: DB.currentUser(),
        planeList: [],
        articleList: []
      }
    },

    created() {
      this.loading = true
      Promise.all([
        DB.getList('Plane', { top: true }, true),
        DB.getList('Artical', '', true)
      ]).then(res=> {
        this.loading = false
        if (res.length > 0) {
          this.planeList = res[0] ? utils.getAttribute(res[0]) : []
          this.articleList = res[1] ? utils.getAttribute(res[1]) : []
        }
      })
    },

    filters: {
      format(date) {
        if (typeof date === 'string') {
          date = new Date(date)
        }
        return date.getYear() - 100 + '/' + utils.fullZero(date.getMonth() + 1) + '/' + utils.fullZero(date.getDate())
      }
    },

    methods: {
      getPlane() {
        DB.getList('Plane', { top: true }, true).then(res=> {
          this.planeList = res ? utils.getAttribute(res) : []
        })
      },

      toArticle(item) {
        this.$router.push(`/read?id=${item.id}`)
      },

      logOut() {
        DB.logOut().then(()=> {
          utils.alert.call(this, '退出登陆成功', 'success')
          this.isAdmin = false
        })
      }
    },

    components: {
      PlaneItem
    }
  }
</script>

<style lang="scss">
  .name {
    font-size: 50px;
    font-family: interface, -webkit-pictograph, serif;
  }
</style>
