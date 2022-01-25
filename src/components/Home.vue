<template>
  <div>
    <router-view> </router-view>
    <div>
			<!-- van-tabbar为标签栏，van-tabbar-item为标签项 -->
      <van-tabbar
        v-model="active"
        active-color="#23d7dd"
        inactive-color="#000"
        @change="onChange"
        route
      >
        <van-tabbar-item icon="home-o" to="/homedata">首页</van-tabbar-item>
        <van-tabbar-item icon="chart-trending-o" to="/history"
          >历史数据</van-tabbar-item
        >
        <van-tabbar-item icon="user-o" to="/user">个人主页</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onChange(index) {
			// 测试当前是否已跳转到该主页
      // console.log(index);
    }
  }
};
</script>
