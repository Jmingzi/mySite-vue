<template>
  <div class="plane-item">
    <div class="panel-title px-line-30 px-padding-lr10 px-font-12">
      <span
        v-if="!isList"
        @click="toPlaneList"
        class="fr cursor-p hover-color color-aaa">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </span>
      <span><i class="el-icon-star-off"></i> 计划</span>
    </div>
    <div class="panel-content px-padding-lr10">
      <div class="plane-item" v-for="item in planeList">
        <p class="px-margin-tb10 px-font-16 font-bold">
          <span>{{item.name}}</span>
          <a
            href="javascript:"
            v-if="item.lastProgress < 100"
            @click="editPlane(item)"
            class="px-font-12 fr px-margin-t5">编辑进度</a>
        </p>
        <el-progress
          :percentage="item.lastProgress"
          :status="`${item.lastProgress === 100 ? 'success' : ''}`"
          :show-text="false">
        </el-progress>
        <div class="position-r px-height-100">
          <div
            class="line-wrap"
            v-for="(p, i) in item.progress"
            :style="{left: `${p.progress ? 630*p.progress/100 - (p.progress === 100 ? 62 : 29) : 0}px`}">
            <div :class="`line ${getCls(p)} ${(i+1)%2 ? 'l' : 's'}`"></div>

            <div :class="`progress-text px-font-12 ${getCls(p)}`" @click="toMessage(p)">
              <span>{{p.date | format}}</span>
              <p class="over-text px-width-60">{{p.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../assets/utils'
  import ElProgress from 'element-ui/lib/progress'
  import 'element-ui/lib/theme-chalk/progress.css'

  export default {
    name: "plane-item",

    props: ['planeList'],

    filters: {
      format(date) {
        if (typeof date === 'string') {
          date = new Date(date)
        }
        return date.getYear() - 100 + '/' + utils.fullZero(date.getMonth() + 1) + '/' + utils.fullZero(date.getDate())
      }
    },

    computed: {
      isList() {
        return this.$route.name === 'PlaneList'
      }
    },

    methods: {
      getCls(p) {
        return p.progress === 0 ? 'start' : p.progress === 100 ? 'end' : 'middle'
      },

      editPlane(item) {
        localStorage.setItem('planeItem', JSON.stringify(item))
        this.$router.push(`/add-plane?id=${item.id}`)
      },

      toPlaneList() {
        this.$router.push('/plane-list')
      },

      toMessage(p) {
        // const h = this.$createElement
        this.$notify({
          title: p.title,
          duration: 0,
          position: 'bottom-left',
          dangerouslyUseHTMLString: true,
          // message: h(
          //   'div',
          //   { class: 'px-font-14 color-c999' },
          //   `<p>进度：${p.progress}</p>` + p.desc
          // )
          message: `<p>进度：${p.progress}%</p>${p.desc}`
        })
      }
    },

    components: {
      ElProgress
    }
  }
</script>

<style lang="scss" scoped>
  .plane-item:not(:first-child) {
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px #f2f2f2 dashed;
  }
</style>
