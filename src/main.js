import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/hyc-mint.scss'

import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont.css'
import 'animate.css'
Vue.config.productionTip = false
Vue.use(Mint)

import VConsole from 'vconsole'

if (process.env.VUE_APP_RUNTIME_ENV === 'development') {
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
