<template>
  <div class="wrap">
    <div class="left-menu position-a left-0 top-0 bottom-0 bd-ccc-r">
      <ul>
        <li>新建文件夹</li>
      </ul>
    </div>
    <div class="right-content position-a right-0 top-0 bottom-0">
      <div class="title bd-ccc-b cl">
        <div class="fr px-line-50 text-center px-margin-r10">
          <div class="btn px-btn btn-error line-normal cursor-p" @click="publish">发布</div>
        </div>
        <div class="fr px-line-50 text-center px-margin-r10">
          <div class="btn px-btn btn-aaa line-normal btn-inverse cursor-p">保存到草稿</div>
        </div>
        <div class="fr px-line-50 text-center px-margin-r10">
          <div class="btn px-btn btn-aaa line-normal btn-inverse cursor-p">返回</div>
        </div>
        <input type="text" placeholder="请输入标题" class="px-height-50 px-padding-lr10">
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
        frameUrl: '//localhost:8080/dist/my-editor/index.html'
      }
    },

    mounted() {

    },

    methods: {
      publish() {
        let frame = this.$refs.frame
        console.log(frame.contentWindow.Editor)
      }
    }
  }
</script>

<style lang="scss">
  .wrap {
    overflow: hidden;
  }
  .left-menu {
    width: 200px;
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
