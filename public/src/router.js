import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import Logout from './views/Logout'
import CreateSection from './views/CreateSection'
import Section from './views/Section'
import SectionList from './views/SectionList'
import Comments from './views/Comments'
import Posts from './views/Posts'

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
    },
    {
      path: '/createSection',
      name: 'createSection',
      component: CreateSection
    },
    {
      path: '/section/:address/:page?',
      name: 'section',
      component: Section
    },
    {
      path: '/sectionList',
      name: 'sectionList',
      component: SectionList
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Comments
    },
    {
      path: '/posts/:page?',
      name: 'posts',
      component: Posts
    }
  ]
})
