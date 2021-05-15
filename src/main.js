import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/libs/bootstrap/css/bootstrap.css'
import { Plugin } from 'vue-fragment'
import UUID from 'vue-uuid'  
import VueI18n from 'vue-i18n'
import ru from '@/lang/ru'
import VueMask from 'v-mask'

Vue.use(VueMask);
Vue.use(Plugin)
Vue.use(UUID)
Vue.use(VueI18n)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'ru',
  messages: {
    'en': {
      // ...
    },
    'ru': {
      ...ru
    }
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')