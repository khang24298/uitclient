import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Project from '../views/Project.vue'
import viewEvaluation from '../views/Evaluation.vue'
import viewCriteria from '../views/Criteria.vue'
import viewRanking from '../views/Ranking.vue'
import viewReport from '../views/Report.vue'
import viewMailBox from '../views/MailBox.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // (store.getters)
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
      // (store.getters)
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
    component: About,
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project,
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
  },
  {
    path: '/criteria',
    name: 'viewCriteria',
    component: viewCriteria,
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(store.getters['auth/user'].role <= 2){
        next(from);
      }
      next()
    }
  },
  {
    path: '/evaluation',
    name: 'viewEvaluation',
    component: viewEvaluation, 
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
    
  },
  {
    path: '/ranking',
    name: 'viewRanking',
    component: viewRanking, 
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
  },
  {
    path: '/report',
    name: 'viewReport',
    component: viewReport, 
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
  },
  {
    path: '/mailbox',
    name: 'viewMailBox',
    component: viewMailBox, 
    beforeEnter: (to, from, next) => {
      // (store.getters)
      if(!store.getters['auth/authenticated']){
        return next({
          name:"Login"
        })
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
