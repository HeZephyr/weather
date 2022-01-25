// 引入各级路由页面和组件
import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Register from '../components/Register.vue';

// 安装插件
Vue.use(VueRouter);

// 创建路由对象。传routes实例
const routes = [
/*
* path代表路径，redirect重定向，component代表组件，表示绑定的组件
* '/'为首页路径，为最先被加载的模块
*/
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/home',
    component: Home,
    redirect: '/homedata',
    // 嵌套路由，例如当home/homedata匹配成功，那么homedata组件就会被渲染
    children: [
      {
        path: '/homedata',
        name: 'homedata',
        component: () => import('@/components/HomeData.vue')
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('@/components/History.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/components/User.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

// 导出路由
export default router;
