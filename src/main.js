import Vue from 'vue'
import App from './App.vue'

//引入仓库
import store from './store'
// import './styles/index.scss'
import './styles/base.css'
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '@/assets/fonts/iconfont.css'
import '@/tools/directive'
// use
Vue.use(mavonEditor)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')