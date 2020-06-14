// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

axios.defaults.baseURL = process.env.URL_API
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.defaults.adapter = httpAdapter

axios.interceptors.request.use(function (config) {
  const hash = localStorage.getItem('token')
  if (hash !== '0') {
    config.headers = config.headers || {}

    console.log(config.headers)
    config.headers['Token'] = hash
  } else {
    localStorage.setItem('username', '')
    localStorage.setItem('token', '')
    window.location.href = '/login'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    localStorage.setItem('username', '')
    localStorage.setItem('token', '')
    window.location.href = '/login'
  }
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$http = axios

Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
