// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MessageBox from 'element-ui/lib/message-box'
import Message from 'element-ui/lib/message'
import Loading from 'element-ui/lib/loading'
import Notify from 'element-ui/lib/notification'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/message.css'
import 'element-ui/lib/theme-chalk/loading.css'
import 'element-ui/lib/theme-chalk/notification.css'
import 'element-ui/lib/theme-chalk/icon.css'

Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notify

Vue.config.productionTip = false

const appId = 'UjPTkcNRB9HL7458RuG6f8xk-gzGzoHsz'
const appKey = 'ylcamdRnbp8FyA7CoDAL5BSz'
AV.init({ appId, appKey })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
  render:  h => h(App)
})
