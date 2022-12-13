import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import i18n from '@/lang'
import ThemePicker from '@/components/ThemePicker'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(ElementUI, { // 设置element为当前的语言
  i18n: (key, value) => i18n.t(key, value)
})
Vue.component('ThemePicker',ThemePicker)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
