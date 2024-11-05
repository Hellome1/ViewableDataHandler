import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/assets/preset.scss'
import '@/assets/index.scss'

Vue.prototype.cp = (obj) => {
  if ('object' === typeof obj) return JSON.parse(JSON.stringify(obj));
  else return obj;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
