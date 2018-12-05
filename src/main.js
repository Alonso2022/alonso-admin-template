import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import i18n from '@/lang' // 国际化 Internationalization
import SvgIcon from '@/components/svgIcon' // svg组件
import '@/permission' // permission control
// import './icons' // icon
import '@/mock'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register globally
Vue.component('svg-icon', SvgIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// var env = process.env.NODE_ENV
// var base_api = process.env.VUE_APP_BASE_API
// console.log(env, base_api)
