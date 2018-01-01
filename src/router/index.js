import Vue from 'vue'
import Router from 'vue-router'
import Editor from '../views/Editor.vue'
import Login from '../views/Login.vue'
import DB from '../assets/db'

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Editor
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

route.beforeEach((to, from, next) => {
  if (to.matched.some(item=> item.meta.auth)) {
    let currentUser = DB.currentUser()
    if (currentUser) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default route
