// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

// 设置反向代理，前端请求默认发送到 http://localhost:8080/music
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080/'

Vue.prototype.$axios = axios;
Vue.prototype.host = '/music'

// const axiosInstance = axios.create({
// headers: {'Content-Type': 'application/json;charset=utf-8'},// 设置传输内容的类型和编码
// withCredentials: true,// 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
// });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
