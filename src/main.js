// 引入所需要的插件、css和js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/vant.js';
import axios from 'axios';

// @amap/amap-jsapi-loader是高德地图的api
import AMapLoader from '@amap/amap-jsapi-loader';
import './assets/css/global.css';
import './assets/js/sdk';

// vue添加实例，使得在所有vue实例中都可以使用
Vue.prototype.$AMapLoader = AMapLoader;
Vue.prototype.$axios = axios;

// 关闭生产提示，方便调试，且开启会增加应用的体积
Vue.config.productionTip = false;

// 初始化vue实例
new Vue({
  router,
  // 渲染组件挂载到el上
  render: (h) => h(App)
}).$mount('#app');
