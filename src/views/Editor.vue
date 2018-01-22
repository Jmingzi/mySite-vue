<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    class="wrap height-100">
    <div class="w200 left-menu position-a left-0 top-0 px-bottom-50 bd-ccc-r">
      <ul class="menu-top">
        <li class="position-r px-font-16 px-line-50 px-height-50 bd-ccc-b">
          <div
            v-if="isAdmin"
            class="width-100 height-100 hover-bg text-center color-folder"
            @click.stop="addFolder">
            <i class="iconfont icon-add"></i>
            <span>新建目录</span>
          </div>
          <div
            @click="$router.push('/editor')"
            class="width-100 height-100 hover-bg text-center color-info"
            v-else>
            <i class="iconfont icon-shenpi_faqishenpi"></i>
            <span>写作模式</span>
          </div>
        </li>

        <li :class="`px-font-14 px-padding-10`" v-show="isAddFolder">
          <i class="iconfont icon-queding fr color-c999 px-margin-t5" @click.stop="confirmAddFolder"></i>
          <i class="iconfont icon-guanbi fr color-c999 px-margin-5" @click.stop="cancelAddFolder"></i>
          <i class="iconfont icon-CombinedShape1 color-folder"></i>
          <input type="text" maxlength="10" v-model.trim="newFolderName" class="new-folder-input">
        </li>

        <template v-for="(item, index) in path">
          <li
            :class="`px-font-16 px-padding-10 ${ savePath && savePath.id === item.id ? 'bg-f2' : '' }`"
            :key="item.id"
            @click.stop="selectPath(item)">
            <!--<span-->
              <!--v-if="isEditFolder && savePath.id === item.id"-->
              <!--class="fr px-font-10 color-c999 px-margin-t5" @click.stop="confirmAddFolder">确定</span>-->
            <template v-if="isEditFolder && savePath.id === item.id">
              <i class="iconfont icon-queding fr color-c999 px-margin-t5" @click.stop="confirmAddFolder"></i>
              <i class="iconfont icon-guanbi fr color-c999 px-margin-5" @click.stop="cancelAddFolder"></i>
            </template>
            <i v-else @click.stop="toggle(item)"
              :class="`iconfont px-font-10 px-margin-t5 color-ccc fr ${showLeftMenu[item.id] ? 'icon-jiantou' : 'icon-Triangle'}`"></i>
            <i class="iconfont icon-CombinedShape1 color-folder"></i>

            <input
              v-if="isEditFolder && savePath.id === item.id"
              type="text"
              maxlength="20"
              v-model.trim="newFolderName"
              class="new-folder-input px-font-14">
            <span v-else>{{ item.name }}</span>
          </li>

          <ul v-show="showLeftMenu[item.id]">
            <template v-if="item.artical">
              <li
                class="hover-bg"
                v-for="arti in item.artical"
                :key="arti.id"
                @click.stop="setArticalFill(item, arti)">
                <i :class="`iconfont icon-zhinan ${arti.status === 0 ? 'color-file' : 'color-green'}`"></i>
                <i v-if="isAdmin" class="fr iconfont icon-yishanchu color-c999" @click.stop="delArtical(arti, index)"></i>
                <span>{{ arti.artical_title }}</span>
              </li>
              <li class="hover-bg" v-if="item.artical.length === 0">还没有文章</li>
            </template>
          </ul>
        </template>
      </ul>
    </div>

    <div class="right-content position-a right-0 top-0 bottom-0">
      <div class="title bd-ccc-b cl px-font-14 px-height-50">
        <template v-if="isAdmin && savePath">
          <div class="fr px-line-50 text-center px-margin-r10">
            <div class="btn px-btn btn-error line-normal cursor-p" @click="publish(1)">发布</div>
          </div>
          <div class="fr px-line-50 text-center px-margin-r10" @click="publish(0)">
            <div v-show="saveArtical ? saveArtical.status !== 1 : true " class="btn px-btn btn-aaa line-normal btn-inverse cursor-p">保存到草稿</div>
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
          :disabled="!isAdmin"
          :placeholder="isAdmin ? savePath ? '请输入标题' : '从选择一个目录开始' : 'Jmingzi的笔记系统' + '...'"
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
        <div class="text-center px-padding-t100" v-show="!savePath">
          <p class="px-font-32 px-padding-t100">Hey, boy !</p>
          <span class="color-c666">世界在你手上...</span>
        </div>
      </div>
    </div>

    <div class="position-a text-center left-0 w200 bottom-0 bd-ccc-r px-height-50 overflow-h">
      <a v-if="isAdmin" href="javascript:" @click="logOut" class="display-b bd-ccc-t px-line-50 width-50 fl">退出登录</a>
      <a v-if="isAdmin" href="#/read" class="display-b bd-ccc-t px-line-50 width-50 fl">阅读模式</a>
    </div>
  </div>
</template>

<script>
  import DB from '../assets/db'
  import utils from '../assets/utils'
  let alert

  export default {
    name: 'editor',

    data() {
      return {
        loading: false,
        // 文章标题
        articalTitle: '',
        // 目录展开
        showLeftMenu: {},
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

    created() {
      alert = utils.alert.bind(this)
    },

    computed: {
      isAdmin() {
        return this.$route.name === 'Editor'
      },

      frameUrl() {
        return (Number(location.port) === 8080
          ? '//localhost:8080/dist/my-editor/index.html'
          : './my-editor/index.html') + (this.isAdmin ? '' : '?preview=1')
      },

      articleId() {
        return this.$route.query.id
      }
    },

    mounted() {
      this.loading = true
      DB.getList('Folder').then(res => {
        this.path = this.getAttribute(res)

        // 展开这篇文章的目录与详情
        if (this.articleId) {
          DB.queryDetail('Artical', this.articleId).then(res=> {
            this.savePath = {
              id: res.attributes.artical_folder.id,
              name: res.attributes.artical_folder.name
            }
            this.$nextTick(()=> {
              this.toggle(this.savePath)
              this.loading = false
            })
          })
        } else {
          this.loading = false
        }
      })
    },

    methods: {
      editorInstance() {
        return this.$refs.frame ? this.$refs.frame.contentWindow.Editor : null
      },

      getAttribute(res) {
        return res.map(item => {
          return {
            ...item.attributes,
            id: item.id
          }
        })
      },

      publish(status) {
        this.checkPriv()

        let instance = this.editorInstance()
        if (!instance) {
          this.$msgbox('editor未初始化')
          return
        }

        let data = {
          status,
          artical_title: this.articalTitle,
          artical_thumb: '',
          artical_content: instance.getHTML(),
          artical_markdown: instance.getMarkdown(),
          // artical 置空，否则循环引用
          artical_folder: { ...this.savePath, artical: [] }
        }

        if (!data.artical_title) {
          alert('请填写标题')
          return
        }

        if (this.saveArtical) {
          // console.log(this.saveArtical)
          data.id = this.saveArtical.id
        }

        this.loading = true
        DB.updateArtical(data).then(res=> {
          this.loading = false
          if (res.id) {
            alert(`${data.id ? '编辑' : '新增'}成功`, 'success')
            let afterData = { id: res.id, ...data }

            if (data.id) {
              // 编辑
              let index = this.savePath.artical.findIndex(x => x.id === data.id)
              this.$set(this.savePath.artical, index, afterData)
            } else {
              // 新增
              if (!this.savePath.artical) {
                this.$set(this.savePath, 'artical', [afterData])

                // 展开
                // let index = this.path.findIndex(x => x.id === this.savePath.id)
                this.toggle(this.savePath)
              } else {
                this.savePath.artical.unshift(afterData)
              }
            }
          }
        })
      },

      setArticalFill(path, arti = {}) {
        this.savePath = path
        this.saveArtical = arti
        this.articalTitle = arti.artical_title || ''
        this.$nextTick(()=> {
          let instance = this.editorInstance()
          if (instance) {
            console.log('editor instance is exist')
            instance.setValue(arti.artical_markdown || '')
          } else {
            console.log('editor has no instance')
            localStorage.setItem('editFillContent', arti.artical_markdown || '')
          }
        })
      },

      toggle(item) {
        if (!this.showLeftMenu[item.id] && !item.artical) {
          // get list
          this.loading = true
          DB.getList('Artical', { 'artical_folder.id': item.id }).then(res=> {
            this.loading = false
            if (res && res.length > 0) {
              item = this.path.find(x=> x.id === item.id)
              this.$set(item, 'artical', this.getAttribute(res))

              if (this.articleId) {
                let readArticle = res.find(x=> x.id === this.articleId)
                this.$nextTick(()=> {
                  this.setArticalFill(item, {
                    id: readArticle.id,
                    ...readArticle.attributes
                  })
                })
              }
            }
          })
        }
        this.$set(this.showLeftMenu, item.id, !this.showLeftMenu[item.id])
      },

      selectPath(item) {
        if (!this.isAdmin) {
          return
        }

        if (!this.isEditFolder) {
          this.setArticalFill(item)
          this.saveArtical = null
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
          console.log(res.id)
          if (res.id) {
            alert(`${this.isEditFolder ? '编辑' : '新建'}目录成功`, 'success')
            if (this.isEditFolder) {
              this.savePath.name = data.name
            } else {
              this.path.unshift({ ...data, id: res.id })
            }
            this.cancelAddFolder()
          }
        })
      },

      cancelAddFolder() {
        this.isAddFolder = false
        this.isEditFolder = false
        this.savePath = null
        this.newFolderName = '新建目录'
      },

      addFolder() {
        this.checkPriv()

        if (!this.isEditFolder) {
          this.isAddFolder = true
        } else {
          alert('请先编辑完成', 'info')
        }
      },

      editCurrFolder() {
        this.checkPriv()

        if (!this.isAddFolder) {
          this.isEditFolder = true
          this.newFolderName = this.savePath.name
        } else {
          alert('请先新建完成', 'info')
        }
      },

      delFolder() {
        this.checkPriv()

        let index = this.path.findIndex(x => x.id === this.savePath.id)

        if (this.showLeftMenu[this.path[index].id] === undefined) {
          alert('请先查看该目录下是否存在文章', 'info')
          return
        }

        if (this.savePath.artical && this.savePath.artical.length > 0) {
          alert('请先删除该目录下的文章', 'info')
          return
        }

        // this.savePath.id
        this.loading = true
        DB.updateFolder({ ...this.savePath, del: true }).then(res=> {
          this.loading = false
          if (res.id) {
            this.showLeftMenu[this.path[index].id] = false
            this.path.splice(index, 1)
            this.savePath = null
            alert('删除目录成功', 'success')
          }
        })
      },

      delArtical(arti, pathIndex) {
        this.checkPriv()

        this.loading = true
        DB.updateArtical({ ...arti, status: -1 }).then(res=> {
          this.loading = false
          if (res.id) {
            let index = this.path[pathIndex].artical.findIndex(x => x.id === arti.id)
            this.path[pathIndex].artical.splice(index, 1)

            this.$set(this.path, pathIndex, this.path[pathIndex])
            alert('删除成功', 'success')
          }
        })
      },

      logOut() {
        DB.logOut().then(res=> {
          if (res) {
            this.$router.push('/login')
          } else {
            alert(res.error)
          }
        })
      },

      // genderDisableMask(len = 50) {
      //   return Array.from(new Array(len)).fill('<span class="line-mask"></span>').join('')
      // },

      checkPriv() {
        if (!this.isAdmin) {
          this.$router.replace('/editor')
        }
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
  .hover-bg {
    &:hover {
      background-color: #f2f2f2;
    }
  }

  .left-menu {

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
      &>li:not(:first-child) {
        border-bottom: 1px #cdcdcd dashed;
      }

      ul {
        font-size: 14px;
        line-height: 30px;
        color: #666;
        // 盖住边线
        margin-top: -1px;
        background-color: #fff;
        border-bottom: 1px #cdcdcd dashed;

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
        width: 45%;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
