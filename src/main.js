import Vue from 'vue'
import App from './App.vue'
import '@/plugins/vue-modal'
import '@/plugins/vue-axios'
import '@/plugins/vue-moment'
import '@/plugins/vue-filter'
import store from '@/store/index.js'
import router from '@/router'
require('@/store/actions')

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(()=>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')    
})

