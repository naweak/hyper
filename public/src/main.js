import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.prototype.$title = (title) => {
  document.getElementsByTagName('title')[0].innerText = title
}

import $ from 'jquery'
new Vue({
  router,
  render: h => h(App),
  data: {
    config,
    userInfo: false
  },
  methods: {
    updateUserInfo () {
      var vm = this
      $.ajax({
        url: vm.config.api,
        data: {
          method: 'userInfo',
          token: vm.$cookies.get('token')
        },
        success (data) {
          if (data.success)
            vm.userInfo = data.success
          else
            vm.userInfo = false
        }
      })
    }
  },
  created () {
    this.updateUserInfo()
  }
}).$mount('#app')
