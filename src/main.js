import Vue from 'vue'
import App from './App.vue'
import '@/plugins/vue-modal'
import '@/plugins/vue-axios'
import '@/plugins/vue-moment'
import '@/plugins/vue-filter'
import '@/plugins/vue-image'
import titleMixin from '@/plugins/vue-mixin'
import store from '@/store/index.js'
import router from '@/router'
import KProgress from 'k-progress';
Vue.component('k-progress', KProgress);

require('@/store/actions')

Vue.mixin(titleMixin)
Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(()=>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')    
})

