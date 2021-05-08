import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Project from '../views/Project.vue'
import viewEvaluation from '../views/Evaluation.vue'
import viewCriteria from '../views/Criteria.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // console.log(store.getters)
      if(store.getters['auth/authenticated']){
        return next({
          name:"Home"
        })
      }
      else{
        next()
      }
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      // console.log(store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/criteria',
    name: 'viewCriteria',
    component: viewCriteria
  },
  {
    path: '/evaluation',
    name: 'viewEvaluation',
    component: viewEvaluation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
