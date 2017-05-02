// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'

import store from 'vuex-requests/src/store/plugin'
import AppointmentGuruBackend from 'vuex-requests/src/store/backends/appointmentguru'

let backends = [
  {
    name: 'appointmentguru',
    class: AppointmentGuruBackend
  }
]
Vue.use(store, backends)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#appointmentguruonboarder',
  template: '<App/>',
  components: { App }
})
