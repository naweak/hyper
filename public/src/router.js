import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import Logout from './views/Logout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})
