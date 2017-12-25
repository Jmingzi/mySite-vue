// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const appId = 'UjPTkcNRB9HL7458RuG6f8xk-gzGzoHsz'
const appKey = 'ylcamdRnbp8FyA7CoDAL5BSz'
AV.init({ appId, appKey })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
