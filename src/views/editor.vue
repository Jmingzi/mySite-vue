<template>
  <div class="wrap">
    <div class="left-menu position-a left-0 top-0 bottom-0 bd-ccc-r">
      <ul class="menu-top">
        <li
          class="px-font-16 px-line-50 px-height-50 bd-ccc-b hover-bg text-center color-folder"
          @click.stop="addFolder">
          <i class="iconfont icon-add"></i>
          <span>新建目录</span>
        </li>

        <li :class="`px-font-14 px-padding-10`" v-show="isAddFolder">
          <i class="iconfont icon-queding fr color-c999 px-margin-t5" @click.stop="confirmAddFolder"></i>
          <i class="iconfont icon-guanbi fr color-c999 px-margin-5" @click.stop="cancelAddFolder"></i>
          <i class="iconfont icon-CombinedShape1 color-folder"></i>
          <input type="text" maxlength="10" v-model.trim="newFolderName" class="new-folder-input">
        </li>

        <template v-for="(item, index) in path">
          <li :class="`px-font-16 px-padding-10 ${ savePath && savePath.id === item.id ? 'bg-f2' : '' }`" @click.stop="selectPath(item)">
            <!--<span-->
              <!--v-if="isEditFolder && savePath.id === item.id"-->
              <!--class="fr px-font-10 color-c999 px-margin-t5" @click.stop="confirmAddFolder">确定</span>-->
            <template v-if="isEditFolder && savePath.id === item.id">
              <i class="iconfont icon-queding fr color-c999 px-margin-t5" @click.stop="confirmAddFolder"></i>
              <i class="iconfont icon-guanbi fr color-c999 px-margin-5" @click.stop="cancelAddFolder"></i>
            </template>
            <i v-else @click.stop="toggle(index, item)"
              :class="`iconfont px-font-10 px-margin-t5 color-ccc fr ${showLeftMenu[index] ? 'icon-jiantou' : 'icon-Triangle'}`"></i>
            <i class="iconfont icon-CombinedShape1 color-folder"></i>

            <input
              v-if="isEditFolder && savePath.id === item.id"
              type="text"
              maxlength="20"
              v-model.trim="newFolderName"
              class="new-folder-input px-font-14">
            <span v-else>{{ item.name }}</span>
          </li>

          <ul v-show="showLeftMenu[index]">
            <li
              v-if="item.artical"
              class="hover-bg"
              v-for="arti in item.artical"
              @click="setArticalFill(item, arti)">
              <i :class="`iconfont icon-zhinan ${arti.status === 1 ? 'color-file' : 'color-green'}`"></i>
              <i class="fr iconfont icon-yishanchu color-c999" @click="delArtical(arti)"></i>
              <span>{{ arti.artical_title }}</span>
            </li>
          </ul>
        </template>
      </ul>
    </div>
    <div class="right-content position-a right-0 top-0 bottom-0">
      <div class="title bd-ccc-b cl px-font-14 px-height-50">
        <template v-if="savePath">
          <div class="fr px-line-50 text-center px-margin-r10">
            <div class="btn px-btn btn-error line-normal cursor-p" @click="publish(1)">发布</div>
          </div>
          <div class="fr px-line-50 text-center px-margin-r10" @click="publish(0)">
            <div class="btn px-btn btn-aaa line-normal btn-inverse cursor-p">保存到草稿</div>
          </div>

          <div class="fr px-line-50 text-right w200 over-text px-margin-r10">
            <span>{{ savePath.name }}</span>
            <span v-show="!isEditFolder">
              <span>/</span>
              <span class="color-info cursor-p" @click="editCurrFolder">编辑</span>
              <span>/</span>
              <span class="color-error cursor-p" @click="delFolder">删除</span>
            </span>
          </div>
        </template>

        <input
          type="text"
          :placeholder="savePath ? '请输入标题' : '从选择一个目录开始...'"
          v-model.trim="articalTitle"
          class="height-100 px-padding-lr10 px-font-16">
      </div>
      <div class="position-a px-top-60 px-bottom-10 width-100">
        <iframe
          v-if="savePath"
          :src="frameUrl"
          frameborder="0"
          height="100%"
          width="100%"
          ref="frame">
        </iframe>
        <div class="text-center px-padding-t100" v-else>
          <p class="px-font-32 px-padding-t100">Hey, boy !</p>
          <span class="color-c666">世界在你手上...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DB from '../assets/db'

  export default {
    name: 'editor',

    data() {
      return {
        // 文章标题
        articalTitle: '',

        frameUrl: '//localhost:8080/dist/my-editor/index.html',
        editorInstance: false,

        // 目录展开
        showLeftMenu: [],

        // 目录列表
        path: [],

        isAddFolder: false,
        isEditFolder: false,
        newFolderName: '新建目录',

        // 选中的目录
        savePath: null,

        // 选中的文章
        saveArtical: null
      }
    },

    mounted() {
      DB.getList('Folder').then(res => {
        this.path = this.getAttribute(res)
      })

      if (!window.editorLoadCallback) {
        window.editorLoadCallback = (editorIns) => {
          this.editorInstance = editorIns
        }
      }
    },

    methods: {
      getAttribute(res) {
        return res.map(item => {
          return {
            ...item.attributes,
            id: item.id
          }
        })
      },

      publish(status) {
        // this.editorInstance
        if (!this.editorInstance) {
          alert('editor未初始化')
          return
        }

        DB.updateArtical({
          status,
          artical_title: this.articalTitle,
          artical_thumb: '',
          artical_content: this.editorInstance.getHTML(),
          artical_markdown: this.editorInstance.getHTML(),
          artical_folder: this.savePath
        }).then(res=> {
          console.log(res)
        })
      },

      setArticalFill(path, arti) {
        // 异步初始化editor之前
        if (!this.editorInstance) {
          localStorage.setItem('editFillContent', arti.artical_markdown)
        } else {
          this.editorInstance.setMarkdown(arti.artical_markdown)
        }

        this.saveArtical = arti
        this.articalTitle = arti.artical_title || ''
        this.selectPath(path)
      },

      toggle(index, item) {
        if (!this.showLeftMenu[index] && !item.artical) {
          // get list
          DB.getList('Artical', { 'artical_folder.id': item.id }).then(res=> {
            this.$set(item, 'artical', this.getAttribute(res))
          })
        }

        this.$set(this.showLeftMenu, index, !this.showLeftMenu[index])
      },

      selectPath(item) {
        if (!this.isEditFolder) {
          this.savePath = item
        } else {
          console.log('请先编辑完成')
        }
      },

      confirmAddFolder() {
        if (!this.newFolderName) {
          alert('请输入目录名称')
          return
        }

        let data = {
          name: this.newFolderName
        }

        if (this.isEditFolder) {
          data.id = this.savePath.id
        }
        DB.updateFolder(data).then(res => {
          console.log(res)
        })
      },

      cancelAddFolder() {
        this.isAddFolder = false
        this.isEditFolder = false
        this.newFolderName = '新建目录'
      },

      addFolder() {
        if (!this.isEditFolder) {
          this.isAddFolder = true
        } else {
          alert('请先编辑完成')
        }
      },

      editCurrFolder() {
        if (!this.isAddFolder) {
          this.isEditFolder = true
          this.newFolderName = this.savePath.name
        } else {
          alert('请先新建完成')
        }
      },

      delFolder() {
        // this.savePath.id
      },

      delArtical(arti) {

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
  .color-green {
    color: #00B996;
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

    .new-folder-input {
      width: 110px;
      padding: 5px 10px;
      border: 1px #cdcdcd solid;
      border-radius: 2px;
      &:focus {
        outline: 1px #22a7f0 solid;
        border-radius: 2px;
      }
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
          padding-right: 10px;

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
