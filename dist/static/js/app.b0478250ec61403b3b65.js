webpackJsonp([1],{"+Rdb":function(t,e){},"/I4U":function(t,e){},"2rGO":function(t,e){},"3zFZ":function(t,e){},"5HkM":function(t,e){},"6CRZ":function(t,e){},BxWU:function(t,e){},DIFm:function(t,e){},GXEp:function(t,e){},Iun5:function(t,e){},Jcqz:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},s=i("VU/8")({name:"app",components:{}},a,!1,function(t){i("5HkM")},null,null).exports,r=i("/ocq"),o=i("//Fk"),l=i.n(o),c=i("fZjL"),d=i.n(c),u={Folder:AV.Object.extend("Folder"),Artical:AV.Object.extend("Artical"),Plane:AV.Object.extend("Plane"),updateFolder:function(t){var e=void 0;return e=t.id?AV.Object.createWithoutData("Folder",t.id):new this.Folder,t.del?e.destroy():(e.set("name",t.name),e.save())},updateArtical:function(t){var e=void 0;return e=t.id?AV.Object.createWithoutData("Artical",t.id):new this.Artical,-1===t.status?e.destroy():(d()(t).forEach(function(i){"id"!==i&&e.set(i,t[i])}),e.save())},getList:function(t,e,i){var n=new AV.Query(t);return e&&d()(e).forEach(function(t){n.equalTo(t,e[t])}),n.descending("createdAt"),i?n.first():n.find()},queryDetail:function(t,e){return new AV.Query(t).get(e)},updatePlane:function(t){var e=void 0;return e=t.id?AV.Object.createWithoutData("Plane",t.id):new this.Plane,t.del?e.destroy():(d()(t).forEach(function(i){"id"!==i&&e.set(i,t[i])}),e.save())},signUp:function(){var t=new AV.User;t.setUsername("jmingzi"),t.setPassword("ck.123456"),t.setEmail("472102644@qq.com"),t.signUp().then(function(t){console.log(t)},function(t){})},currentUser:function(){return AV.User.current()},logOut:function(){return AV.User.logOut()},login:function(t,e){return AV.User.logIn(t,e)}},p=i("Dd8w"),f=i.n(p),m={alert:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"error";this.$message({message:t,type:e,center:!0})},getAttribute:function(t){return t instanceof Array?t.map(function(t){return f()({},t.attributes,{id:t.id})}):[f()({},t.attributes,{id:t.id,time:t.createdAt||t.updatedAt})]},fullZero:function(t){return t>9?t:"0"+t}},h=i("mvHQ"),v=i.n(h),g=i("GegP"),_=i.n(g),x=(i("uKbn"),{name:"plane-item",props:["planeList","isAdmin"],filters:{format:function(t){return"string"==typeof t&&(t=new Date(t)),t.getYear()-100+"/"+m.fullZero(t.getMonth()+1)+"/"+m.fullZero(t.getDate())}},computed:{isList:function(){return"PlaneList"===this.$route.name}},methods:{getCls:function(t){return 0===t.progress?"start":100===t.progress?"end":"middle"},editPlane:function(t){localStorage.setItem("planeItem",v()(t)),this.$router.push("/add-plane?id="+t.id)},toPlaneList:function(){this.$router.push("/plane-list")},delPlane:function(t,e){var i=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{type:"warning"}).then(function(){u.updatePlane({id:t.id,del:!0}).then(function(t){t&&(i.$message({type:"success",message:"删除成功!"}),i.isList?i.planeList.splice(e,1):i.$emit("updateList"))})})},toMessage:function(t){this.$notify({title:t.title,duration:0,position:"bottom-left",dangerouslyUseHTMLString:!0,message:"<p>进度："+t.progress+"%</p>"+t.desc})}},components:{ElProgress:_.a}}),b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"plane-item px-padding-b20"},[i("div",{staticClass:"panel-title px-line-30 px-padding-lr10 px-font-12"},[t.isList?t._e():i("span",{staticClass:"fr cursor-p hover-color color-aaa",on:{click:t.toPlaneList}},[t._v("\n      更多\n      "),i("i",{staticClass:"el-icon-d-arrow-right"})]),t._v(" "),t._m(0)]),t._v(" "),i("div",{staticClass:"panel-content px-padding-lr10"},[0===t.planeList.length?i("p",{staticClass:"text-center px-padding-t20"},[t._v("暂无置顶计划!")]):t._e(),t._v(" "),t._l(t.planeList,function(e,n){return i("div",{staticClass:"plane-item"},[i("div",{staticClass:"px-margin-tb10 px-font-16 font-bold"},[t.isAdmin?i("div",{staticClass:"fr px-font-12 px-margin-t5"},[e.lastProgress<100?i("a",{attrs:{href:"javascript:"},on:{click:function(i){t.editPlane(e)}}},[t._v("编辑进度")]):t._e(),t._v(" "),i("a",{staticClass:"color-error",attrs:{href:"javascript:"},on:{click:function(i){t.delPlane(e,n)}}},[t._v("删除")])]):t._e(),t._v(" "),i("span",[t._v(t._s(e.name))])]),t._v(" "),i("el-progress",{attrs:{percentage:e.lastProgress,status:100===e.lastProgress?"success":"","show-text":!1}}),t._v(" "),i("div",{staticClass:"position-r px-height-100"},t._l(e.progress,function(e,n){return i("div",{staticClass:"line-wrap",style:{left:(e.progress?630*e.progress/100-(100===e.progress?62:29):0)+"px"}},[i("div",{class:"line "+t.getCls(e)+" "+((n+1)%2?"l":"s")}),t._v(" "),i("div",{class:"progress-text px-font-12 "+t.getCls(e),on:{click:function(i){t.toMessage(e)}}},[i("span",[t._v(t._s(t._f("format")(e.date)))]),t._v(" "),i("p",{staticClass:"over-text px-width-60"},[t._v(t._s(e.title))])])])}))],1)})],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"el-icon-star-off"}),this._v(" 计划")])}]},w=i("VU/8")(x,b,!1,function(t){i("kmL4")},"data-v-6084f788",null).exports,P={name:"index",data:function(){return{loading:!1,isAdmin:u.currentUser(),planeList:[],articleList:[]}},created:function(){var t=this;this.loading=!0,l.a.all([u.getList("Plane",{top:!0},!0),u.getList("Artical","",!0)]).then(function(e){t.loading=!1,e.length>0&&(t.planeList=e[0]?m.getAttribute(e[0]):[],t.articleList=e[1]?m.getAttribute(e[1]):[])})},filters:{format:function(t){return"string"==typeof t&&(t=new Date(t)),t.getYear()-100+"/"+m.fullZero(t.getMonth()+1)+"/"+m.fullZero(t.getDate())}},methods:{getPlane:function(){var t=this;u.getList("Plane",{top:!0},!0).then(function(e){t.planeList=e?m.getAttribute(e):[]})},toArticle:function(t){this.$router.push("/read?id="+t.id)},logOut:function(){var t=this;u.logOut().then(function(){m.alert.call(t,"退出登陆成功","success"),t.isAdmin=!1})}},components:{PlaneItem:w}},A={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"width-100 height-100 text-center",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[t._m(0),t._v(" "),i("div",{staticClass:"plan-article w650 margin-auto panel px-font-14 text-left bd-gray-lighter radius-3"},[i("plane-item",{attrs:{isAdmin:t.isAdmin,planeList:t.planeList},on:{updateList:t.getPlane}}),t._v(" "),i("div",{staticClass:"font-bold px-font-16 bd-gray-lighter-t px-margin-t20"},[t._m(1),t._v(" "),t._l(t.articleList,function(e){return i("p",{staticClass:"px-padding-15 hover-bg cursor-p",on:{click:function(i){t.toArticle(e)}}},[i("span",{staticClass:"fr px-font-14 color-c999"},[t._v("20"+t._s(t._f("format")(e.time)))]),t._v(" "),i("span",[t._v(t._s(e.artical_title))])])}),t._v(" "),i("p",{staticClass:"px-padding-15 hover-bg cursor-p bd-gray-lighter-t text-center",on:{click:function(e){t.$router.push("/read")}}},[i("i",{staticClass:"el-icon-more-outline"})])],2)],1),t._v(" "),i("p",{staticClass:"w650 margin-auto px-padding-t20 px-font-12"},[t.isAdmin?[t._m(2),t._v(" "),t._m(3),t._v(" "),i("a",{staticClass:"ib-middle",attrs:{href:"javascript:"},on:{click:t.logOut}},[i("i",{staticClass:"el-icon-refresh"}),t._v(" 退出登录")])]:[t._m(4),t._v(" "),t._m(5)]],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ib-middle px-padding-tb80"},[e("h1",{staticClass:"font-bold name"},[this._v("Jmingzi")]),this._v(" "),e("div",{staticClass:"description px-font-14 color-c999 px-margin-t10"},[e("p",[this._v("AD&打野")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-title px-line-30 px-padding-lr10 px-font-12"},[e("span",[e("i",{staticClass:"el-icon-tickets"}),this._v(" 文章")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"ib-middle px-margin-r20",attrs:{href:"#/add-plane"}},[e("i",{staticClass:"el-icon-document"}),this._v(" 添加计划")])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"ib-middle px-margin-r20",attrs:{href:"#/editor"}},[e("i",{staticClass:"el-icon-edit-outline"}),this._v(" 写作模式")])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"ib-middle px-margin-r20",attrs:{href:"#/read"}},[e("i",{staticClass:"el-icon-edit-outline"}),this._v(" 阅读模式")])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"ib-middle",attrs:{href:"#/login"}},[e("i",{staticClass:"el-icon-mobile-phone"}),this._v(" 登录")])}]},C=i("VU/8")(P,A,!1,function(t){i("6CRZ")},null,null).exports,F=void 0,k={name:"editor",data:function(){return{loading:!1,articalTitle:"",showLeftMenu:{},path:[],isAddFolder:!1,isEditFolder:!1,newFolderName:"新建目录",savePath:null,saveArtical:null}},created:function(){F=m.alert.bind(this)},computed:{isAdmin:function(){return"Editor"===this.$route.name},frameUrl:function(){return(8080===Number(location.port)?"//localhost:8080/dist/my-editor/index.html":"./my-editor/index.html")+(this.isAdmin?"":"?preview=1")},articleId:function(){return this.$route.query.id}},mounted:function(){var t=this;this.loading=!0,u.getList("Folder").then(function(e){t.path=t.getAttribute(e),t.articleId?u.queryDetail("Artical",t.articleId).then(function(e){t.savePath={id:e.attributes.artical_folder.id,name:e.attributes.artical_folder.name},t.$nextTick(function(){t.toggle(t.savePath),t.loading=!1})}):t.loading=!1})},methods:{editorInstance:function(){return this.$refs.frame?this.$refs.frame.contentWindow.Editor:null},getAttribute:function(t){return t.map(function(t){return f()({},t.attributes,{id:t.id})})},publish:function(t){var e=this;this.checkPriv();var i=this.editorInstance();if(i){var n={status:t,artical_title:this.articalTitle,artical_thumb:"",artical_content:i.getHTML(),artical_markdown:i.getMarkdown(),artical_folder:f()({},this.savePath,{artical:[]})};n.artical_title?(this.saveArtical&&(n.id=this.saveArtical.id),this.loading=!0,u.updateArtical(n).then(function(t){if(e.loading=!1,t.id){F((n.id?"编辑":"新增")+"成功","success");var i=f()({id:t.id},n);if(n.id){var a=e.savePath.artical.findIndex(function(t){return t.id===n.id});e.$set(e.savePath.artical,a,i)}else e.savePath.artical?e.savePath.artical.unshift(i):(e.$set(e.savePath,"artical",[i]),e.toggle(e.savePath))}})):F("请填写标题")}else this.$msgbox("editor未初始化")},setArticalFill:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.savePath=t,this.saveArtical=i,this.articalTitle=i.artical_title||"",this.$nextTick(function(){var t=e.editorInstance();t?(console.log("editor instance is exist"),t.setValue(i.artical_markdown||"")):(console.log("editor has no instance"),localStorage.setItem("editFillContent",i.artical_markdown||""))})},toggle:function(t){var e=this;this.showLeftMenu[t.id]||t.artical||(this.loading=!0,u.getList("Artical",{"artical_folder.id":t.id}).then(function(i){if(e.loading=!1,i&&i.length>0&&(t=e.path.find(function(e){return e.id===t.id}),e.$set(t,"artical",e.getAttribute(i)),e.articleId)){var n=i.find(function(t){return t.id===e.articleId});e.$nextTick(function(){e.setArticalFill(t,f()({id:n.id},n.attributes))})}})),this.$set(this.showLeftMenu,t.id,!this.showLeftMenu[t.id])},selectPath:function(t){this.isAdmin&&(this.isEditFolder?console.log("请先编辑完成"):(this.setArticalFill(t),this.saveArtical=null))},confirmAddFolder:function(){var t=this;if(this.newFolderName){var e={name:this.newFolderName};this.isEditFolder&&(e.id=this.savePath.id),u.updateFolder(e).then(function(i){console.log(i.id),i.id&&(F((t.isEditFolder?"编辑":"新建")+"目录成功","success"),t.isEditFolder?t.savePath.name=e.name:t.path.unshift(f()({},e,{id:i.id})),t.cancelAddFolder())})}else F("请输入目录名称")},cancelAddFolder:function(){this.isAddFolder=!1,this.isEditFolder=!1,this.savePath=null,this.newFolderName="新建目录"},addFolder:function(){this.checkPriv(),this.isEditFolder?F("请先编辑完成","info"):this.isAddFolder=!0},editCurrFolder:function(){this.checkPriv(),this.isAddFolder?F("请先新建完成","info"):(this.isEditFolder=!0,this.newFolderName=this.savePath.name)},delFolder:function(){var t=this;this.checkPriv();var e=this.path.findIndex(function(e){return e.id===t.savePath.id});void 0!==this.showLeftMenu[this.path[e].id]?this.savePath.artical&&this.savePath.artical.length>0?F("请先删除该目录下的文章","info"):(this.loading=!0,u.updateFolder(f()({},this.savePath,{del:!0})).then(function(i){t.loading=!1,i.id&&(t.showLeftMenu[t.path[e].id]=!1,t.path.splice(e,1),t.savePath=null,F("删除目录成功","success"))})):F("请先查看该目录下是否存在文章","info")},delArtical:function(t,e){var i=this;this.checkPriv(),this.loading=!0,u.updateArtical(f()({},t,{status:-1})).then(function(n){if(i.loading=!1,n.id){var a=i.path[e].artical.findIndex(function(e){return e.id===t.id});i.path[e].artical.splice(a,1),i.$set(i.path,e,i.path[e]),F("删除成功","success")}})},logOut:function(){var t=this;u.logOut().then(function(e){e?t.$router.push("/login"):F(e.error)})},checkPriv:function(){this.isAdmin||this.$router.replace("/editor")}}},y={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"wrap height-100",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[i("div",{staticClass:"w200 left-menu position-a left-0 top-0 px-bottom-50 bd-ccc-r"},[i("ul",{staticClass:"menu-top"},[i("li",{staticClass:"position-r px-font-16 px-line-50 px-height-50 bd-ccc-b"},[t.isAdmin?i("div",{staticClass:"width-100 height-100 hover-bg text-center color-folder",on:{click:function(e){e.stopPropagation(),t.addFolder(e)}}},[i("i",{staticClass:"iconfont icon-add"}),t._v(" "),i("span",[t._v("新建目录")])]):i("div",{staticClass:"width-100 height-100 hover-bg text-center color-info",on:{click:function(e){t.$router.push("/editor")}}},[i("i",{staticClass:"iconfont icon-shenpi_faqishenpi"}),t._v(" "),i("span",[t._v("写作模式")])])]),t._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:t.isAddFolder,expression:"isAddFolder"}],class:"px-font-14 px-padding-10"},[i("i",{staticClass:"iconfont icon-queding fr color-c999 px-margin-t5",on:{click:function(e){e.stopPropagation(),t.confirmAddFolder(e)}}}),t._v(" "),i("i",{staticClass:"iconfont icon-guanbi fr color-c999 px-margin-5",on:{click:function(e){e.stopPropagation(),t.cancelAddFolder(e)}}}),t._v(" "),i("i",{staticClass:"iconfont icon-CombinedShape1 color-folder"}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newFolderName,expression:"newFolderName",modifiers:{trim:!0}}],staticClass:"new-folder-input",attrs:{type:"text",maxlength:"10"},domProps:{value:t.newFolderName},on:{input:function(e){e.target.composing||(t.newFolderName=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),t._l(t.path,function(e,n){return[i("li",{key:e.id,class:"px-font-16 px-padding-10 "+(t.savePath&&t.savePath.id===e.id?"bg-f2":""),on:{click:function(i){i.stopPropagation(),t.selectPath(e)}}},[t.isEditFolder&&t.savePath.id===e.id?[i("i",{staticClass:"iconfont icon-queding fr color-c999 px-margin-t5",on:{click:function(e){e.stopPropagation(),t.confirmAddFolder(e)}}}),t._v(" "),i("i",{staticClass:"iconfont icon-guanbi fr color-c999 px-margin-5",on:{click:function(e){e.stopPropagation(),t.cancelAddFolder(e)}}})]:i("i",{class:"iconfont px-font-10 px-margin-t5 color-ccc fr "+(t.showLeftMenu[e.id]?"icon-jiantou":"icon-Triangle"),on:{click:function(i){i.stopPropagation(),t.toggle(e)}}}),t._v(" "),i("i",{staticClass:"iconfont icon-CombinedShape1 color-folder"}),t._v(" "),t.isEditFolder&&t.savePath.id===e.id?i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newFolderName,expression:"newFolderName",modifiers:{trim:!0}}],staticClass:"new-folder-input px-font-14",attrs:{type:"text",maxlength:"20"},domProps:{value:t.newFolderName},on:{input:function(e){e.target.composing||(t.newFolderName=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}):i("span",[t._v(t._s(e.name))])],2),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.showLeftMenu[e.id],expression:"showLeftMenu[item.id]"}]},[e.artical?[t._l(e.artical,function(a){return i("li",{key:a.id,staticClass:"hover-bg",on:{click:function(i){i.stopPropagation(),t.setArticalFill(e,a)}}},[i("i",{class:"iconfont icon-zhinan "+(0===a.status?"color-file":"color-green")}),t._v(" "),t.isAdmin?i("i",{staticClass:"fr iconfont icon-yishanchu color-c999",on:{click:function(e){e.stopPropagation(),t.delArtical(a,n)}}}):t._e(),t._v(" "),i("span",[t._v(t._s(a.artical_title))])])}),t._v(" "),0===e.artical.length?i("li",{staticClass:"hover-bg"},[t._v("还没有文章")]):t._e()]:t._e()],2)]})],2)]),t._v(" "),i("div",{staticClass:"right-content position-a right-0 top-0 bottom-0"},[i("div",{staticClass:"title bd-ccc-b cl px-font-14 px-height-50"},[t.isAdmin&&t.savePath?[i("div",{staticClass:"fr px-line-50 text-center px-margin-r10"},[i("div",{staticClass:"btn px-btn btn-error line-normal cursor-p",on:{click:function(e){t.publish(1)}}},[t._v("发布")])]),t._v(" "),i("div",{staticClass:"fr px-line-50 text-center px-margin-r10",on:{click:function(e){t.publish(0)}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.saveArtical||1!==t.saveArtical.status,expression:"saveArtical ? saveArtical.status !== 1 : true "}],staticClass:"btn px-btn btn-aaa line-normal btn-inverse cursor-p"},[t._v("保存到草稿")])]),t._v(" "),i("div",{staticClass:"fr px-line-50 text-right w200 over-text px-margin-r10"},[i("span",[t._v(t._s(t.savePath.name))]),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:!t.isEditFolder,expression:"!isEditFolder"}]},[i("span",[t._v("/")]),t._v(" "),i("span",{staticClass:"color-info cursor-p",on:{click:t.editCurrFolder}},[t._v("编辑")]),t._v(" "),i("span",[t._v("/")]),t._v(" "),i("span",{staticClass:"color-error cursor-p",on:{click:t.delFolder}},[t._v("删除")])])])]:t._e(),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.articalTitle,expression:"articalTitle",modifiers:{trim:!0}}],staticClass:"height-100 px-padding-lr10 px-font-16",attrs:{type:"text",disabled:!t.isAdmin,placeholder:t.isAdmin?t.savePath?"请输入标题":"从选择一个目录开始":"Jmingzi的笔记系统..."},domProps:{value:t.articalTitle},on:{input:function(e){e.target.composing||(t.articalTitle=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})],2),t._v(" "),i("div",{staticClass:"position-a px-top-60 px-bottom-10 width-100"},[t.savePath?i("iframe",{ref:"frame",attrs:{src:t.frameUrl,frameborder:"0",height:"100%",width:"100%"}}):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.savePath,expression:"!savePath"}],staticClass:"text-center px-padding-t100"},[i("p",{staticClass:"px-font-32 px-padding-t100"},[t._v("Hey, boy !")]),t._v(" "),i("span",{staticClass:"color-c666"},[t._v("世界在你手上...")])])])]),t._v(" "),i("div",{staticClass:"position-a text-center left-0 w200 bottom-0 bd-ccc-r px-height-50 overflow-h"},[t.isAdmin?i("a",{staticClass:"display-b bd-ccc-t px-line-50 width-50 fl",attrs:{href:"javascript:"},on:{click:t.logOut}},[t._v("退出登录")]):t._e(),t._v(" "),t.isAdmin?i("a",{staticClass:"display-b bd-ccc-t px-line-50 width-50 fl",attrs:{href:"#/read"}},[t._v("阅读模式")]):t._e()])])},staticRenderFns:[]},$=i("VU/8")(k,y,!1,function(t){i("3zFZ")},null,null).exports,L={data:function(){return{name:"",pwd:"",loading:!1}},methods:{login:function(){var t=this;this.name&&this.pwd?(this.loading=!0,u.login(this.name,this.pwd).then(function(e){t.loading=!1,e.code?m.alert.call(t,e.error):(m.alert.call(t,"登录成功","success"),history.back())}).then(function(t){console.log(t)})):m.alert.call(this,"请输入信息")}}},E={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login-wrap"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"w200 margin-auto bd-ccc px-padding-20"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.name},on:{keyup:function(e){if(!("button"in e)&&13!==e.keyCode)return null;t.login(e)},input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.pwd,expression:"pwd",modifiers:{trim:!0}}],attrs:{type:"password"},domProps:{value:t.pwd},on:{keyup:function(e){if(!("button"in e)&&13!==e.keyCode)return null;t.login(e)},input:function(e){e.target.composing||(t.pwd=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("div",{staticClass:"text-center"},[i("a",{staticClass:"btn px-btn btn-info px-margin-b10 px-font-14",attrs:{href:"javascript:"},on:{click:t.login}},[t._v("登录")]),i("br"),t._v(" "),i("a",{staticClass:"px-font-14",attrs:{href:"#/"}},[t._v("返回首页")])])])])},staticRenderFns:[]},N=i("VU/8")(L,E,!1,function(t){i("Jcqz")},"data-v-6c10f459",null).exports,U=i("vqwl"),I=i.n(U),D=i("Mezo"),q=i.n(D),M=i("tLa+"),V=i.n(M),T=i("HJMx"),O=i.n(T),j=i("g2bL"),z=i.n(j),R=i("mtrD"),Z=i.n(R),H=i("wxbk"),S=i.n(H),J=(i("+Rdb"),i("qunJ"),i("isgN"),i("BxWU"),i("GXEp"),i("WzZF"),{name:"add-plane",data:function(){return{form:{name:"",title:"",date:new Date,desc:"",progress:0,top:!1},rules:{name:[{required:!0,message:"请输入计划名称",trigger:"blur"},{min:3,max:30,message:"长度在 3 到 30 个字符",trigger:"blur"}],title:[{required:!0,message:"进度标题",trigger:"blur"}],date:[{required:!0,message:"请选择进度日期",trigger:"blur"}],progress:[{type:"number",required:!0,message:"请选择进度",trigger:"blur"},{type:"number",min:this.lastProgress,max:100,message:"最小值",trigger:"change"}]},editPlaneDetail:null}},computed:{isAdd:function(){return!1===Boolean(this.$route.query.id)},lastProgress:function(){return!this.isAdd&&this.editPlaneDetail?this.editPlaneDetail.lastProgress:0}},created:function(){this.isAdd||(this.editPlaneDetail=JSON.parse(localStorage.getItem("planeItem")),this.form.name=this.editPlaneDetail.name,this.form.progress=this.editPlaneDetail.lastProgress,this.form.top=this.editPlaneDetail.top)},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var i=f()({},e.form),n={name:e.form.name,lastProgress:e.form.progress,top:e.form.top,progress:[i]};!e.isAdd&&e.form.progress<=e.editPlaneDetail.lastProgress?m.alert.call(e,"进度值必须大于当前进度"+e.editPlaneDetail.lastProgress+"%"):(delete i.name,delete i.top,e.isAdd||(n.progress=[].concat(e.editPlaneDetail.progress,n.progress),n.id=e.$route.query.id),u.updatePlane(n).then(function(t){t.id&&(m.alert.call(e,e.isAdd?"添加计划成功":"编辑成功","success"),history.back())}))})},resetForm:function(t){this.$refs[t].resetFields()}},components:{ElForm:I.a,ElFormItem:q.a,ElDatePicker:V.a,ElInput:O.a,ElSlider:z.a,ElButton:Z.a,ElSwitch:S.a}}),W={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"w650 margin-auto px-padding-t100"},[this.isAdd?i("h1",{staticClass:"px-padding-b30"},[t._v("添加计划")]):i("h1",{staticClass:"px-padding-b30"},[t._v("编辑计划进度")]),t._v(" "),i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"计划名称",prop:"name"}},[i("el-input",{attrs:{disabled:!t.isAdd},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"进度标题",prop:"title"}},[i("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"进度日期",prop:"date"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}})],1),t._v(" "),t.isAdd?t._e():i("el-form-item",{attrs:{label:"进度",prop:"progress"}},[i("el-slider",{attrs:{type:"number"},model:{value:t.form.progress,callback:function(e){t.$set(t.form,"progress",e)},expression:"form.progress"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"进度内容"}},[i("el-input",{attrs:{type:"textarea"},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"是否置顶"}},[i("el-switch",{model:{value:t.form.top,callback:function(e){t.$set(t.form,"top",e)},expression:"form.top"}})],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("form")}}},[t._v("立即创建")]),t._v(" "),i("el-button",{on:{click:function(e){t.resetForm("form")}}},[t._v("重置")])],1)],1)],1)},staticRenderFns:[]},G=i("VU/8")(J,W,!1,function(t){i("T/x9")},"data-v-fff66b6e",null).exports,B={components:{PlaneItem:w},name:"plane-list",data:function(){return{loading:!1,isAdmin:u.currentUser(),planeList:[]}},created:function(){var t=this;u.getList("Plane").then(function(e){t.loading=!1,e&&(t.planeList=m.getAttribute(e))})}},K={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{directives:[{name:"loading",rawName:"v-loading",value:this.loading,expression:"loading"}],staticClass:"plane-list w650 margin-auto bd-gray-lighter",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.3)"}},[e("plane-item",{attrs:{isAdmin:this.isAdmin,planeList:this.planeList}})],1)},staticRenderFns:[]},Q=i("VU/8")(B,K,!1,function(t){i("DIFm")},"data-v-9d654df0",null).exports;n.default.use(r.a);var X=new r.a({routes:[{path:"/",name:"Index",component:C},{path:"/read",name:"Read",component:$},{path:"/editor",name:"Editor",component:$,meta:{auth:!0}},{path:"/login",name:"Login",component:N},{path:"/add-plane",name:"AddPlane",component:G,meta:{auth:!0}},{path:"/plane-list",name:"PlaneList",component:Q}]});X.beforeEach(function(t,e,i){if(t.matched.some(function(t){return t.meta.auth})){u.currentUser()?i():i("/login")}else i()});var Y=X,tt=i("+TD8"),et=i.n(tt),it=i("2X9z"),nt=i.n(it),at=i("nu7/"),st=i.n(at),rt=i("yg6k"),ot=i.n(rt);i("oq7i"),i("cwe7"),i("2rGO"),i("/I4U"),i("Iun5");n.default.use(st.a.directive),n.default.prototype.$message=nt.a,n.default.prototype.$msgbox=et.a,n.default.prototype.$confirm=et.a.confirm,n.default.prototype.$loading=st.a.service,n.default.prototype.$notify=ot.a,n.default.config.productionTip=!1;AV.init({appId:"UjPTkcNRB9HL7458RuG6f8xk-gzGzoHsz",appKey:"ylcamdRnbp8FyA7CoDAL5BSz"}),new n.default({el:"#app",router:Y,render:function(t){return t(s)}})},"T/x9":function(t,e){},WzZF:function(t,e){},cwe7:function(t,e){},isgN:function(t,e){},kmL4:function(t,e){},oq7i:function(t,e){},qunJ:function(t,e){},uKbn:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b0478250ec61403b3b65.js.map