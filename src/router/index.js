import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Editor from '../views/Editor.vue'
import Login from '../views/Login.vue'
import AddPlane from '../views/AddPlane.vue'
import PlaneList from '../views/PlaneList.vue'
import DB from '../assets/db'

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/read',
      name: 'Read',
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
    },
    {
      path: '/add-plane',
      name: 'AddPlane',
      component: AddPlane,
      meta: {
        auth: true
      }
    },
    {
      path: '/plane-list',
      name: 'PlaneList',
      component: PlaneList
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
