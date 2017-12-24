<template>
  <div class="wrap">
    <div class="left-menu position-a left-0 top-0 bottom-0 bd-ccc-r">
      <ul class="menu-top">
        <li class="px-font-16 px-line-50 px-height-50 bd-ccc-b hover-bg text-center color-folder">
          <i class="iconfont icon-add"></i>
          <span>新建目录</span>
        </li>
        <template v-for="(item, index) in path">
          <li :class="`px-font-16 px-padding-10 ${ savePath && savePath.id === item.id ? 'bg-f2' : '' }`" @click="selectPath(item)">
            <i @click.stop="toggle(index)"
              :class="`iconfont px-font-10 px-margin-t5 color-ccc fr ${showLeftMenu[index] ? 'icon-jiantou' : 'icon-Triangle'}`"></i>
            <i class="iconfont icon-CombinedShape1 color-folder"></i>
            <span>{{ item.name }}</span>
          </li>
          <ul v-show="showLeftMenu[index]">
            <li class="hover-bg"><i class="iconfont icon-zhinan color-file"></i> 如何学好编程</li>
            <li class="hover-bg"><i class="iconfont icon-zhinan color-file"></i> 如何学好编程</li>
            <li class="hover-bg"><i class="iconfont icon-zhinan color-file"></i> 如何学好编程</li>
          </ul>
        </template>
      </ul>
    </div>
    <div class="right-content position-a right-0 top-0 bottom-0">
      <div class="title bd-ccc-b cl px-font-14 px-height-50">
        <div class="fr px-line-50 text-center px-margin-r10">
          <div class="btn px-btn btn-error line-normal cursor-p" @click="publish">发布</div>
        </div>
        <div class="fr px-line-50 text-center px-margin-r10">
          <div class="btn px-btn btn-aaa line-normal btn-inverse cursor-p">保存到草稿</div>
        </div>
        <div class="fr px-line-50 text-center px-margin-r10">
          <div class="btn px-btn btn-aaa line-normal btn-inverse cursor-p">返回</div>
        </div>
        <div class="fr px-line-50 text-right w200 over-text px-margin-r10" v-if="savePath">
          <span>保存目录：</span>
          <span>{{ savePath.name }}</span>
        </div>
        <input type="text" placeholder="请输入标题" class="height-100 px-padding-lr10 px-font-16">
      </div>
      <div class="position-a px-top-60 px-bottom-10 width-100">
        <iframe :src="frameUrl" frameborder="0" height="100%" width="100%" ref="frame"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editor',

    data() {
      return {
        contentVal: '',
        frameUrl: '//localhost:8080/dist/my-editor/index.html',
        showLeftMenu: [],
        savePath: null,
        path: [ { name: '我是谁？', id: 1 } ]
      }
    },

    mounted() {

    },

    methods: {
      publish() {
        let frame = this.$refs.frame
        console.log(frame.contentWindow.Editor)
      },

      toggle(index) {
        this.$set(this.showLeftMenu, index, !this.showLeftMenu[index])
      },

      selectPath(item) {
        this.savePath = item
      }
    }
  }
</script>

<style lang="scss">
  .wrap {
    overflow: hidden;
  }
  .color-folder {
    color: #FE9E0F;
  }
  .color-file {
    color: #ccc;
  }
  .w200 {
    width: 200px;
  }
  .hover-bg {
    &:hover {
      background-color: #f2f2f2;
    }
  }

  .left-menu {
    width: 200px;

    li {
      cursor: pointer;
    }

    .menu-top {
      ul {
        font-size: 14px;
        line-height: 30px;
        color: #666;
        margin-bottom: 10px;

        li:first-child:before {
          height: 15px;
          top: 0;
        }

        li {
          position: relative;
          padding-left: 35px;

          &:before {
            content: '';
            position: absolute;
            width: 13px;
            height: 30px;
            border-bottom: 1px #999 dashed;
            border-left: 1px #999 dashed;
            left: 20px;
            top: -15px;
          }
        }
      }
    }
  }
  .right-content {
    left: 200px;
    .title {
      input {
        border: none;
        width: 50%;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
