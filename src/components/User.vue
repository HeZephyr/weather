<template>
  <div>
    <div class="nullview"></div>
    <div class="aboutme">
      <van-contact-card
        type="edit"
        name="贺志飞"
        tel="13340111867"
        :editable="false"
      />
    </div>
    <div class="mychat">
      <div class="icons">
        <img src="../static/icon/QQ.png" alt="" /> 2825841950
      </div>
      <div class="icons">
        <img src="../static/icon/wechat.png" alt="" /> unique_pursue
      </div>
      <div class="icons">
        <img src="../static/icon/github.png" alt="" />
        unique-pure
      </div>
      <div class="icons">
				<a href="https://pursuit.blog.csdn.net/">
					<img src="../static/icon/csdn.png" alt="" />
					https://pursuit.blog.csdn.net/
				</a>
      </div>
    </div>
    <div class="swiper">
			<!-- 设置轮播，2秒一次 -->
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item>早睡早起</van-swipe-item>
        <van-swipe-item>按时吃饭</van-swipe-item>
        <van-swipe-item>刻苦学习</van-swipe-item>
        <van-swipe-item>锻炼身体</van-swipe-item>
				<van-swipe-item>享受生活</van-swipe-item>
      </van-swipe>
    </div>
    <div class="btn">
      <van-button
        color="linear-gradient(to right, #0e5779, #023349)"
        round
        block
        type="info"
        @click="toLogin"
      >
        切换用户
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toLogin() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="less" scoped>
.nullview {
  width: 100%;
  height: 50px;
}
.aboutme {
  height: 100px;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 25px;
  border-radius: 10px;
  border: 1px solid #000;
  box-shadow: #8f9996 0px 0px 2px 1px;
  .van-contact-card {
    width: 80%;
    margin: 0 auto;
  }
}
.mychat {
  box-sizing: border-box;
  height: 160px;
  width: 90%;
  margin: 0 auto;
  color: #ebe8e8;
  padding: 15px;
  border-radius: 10px;
  background: linear-gradient(to top, #b9bb99, #2996c9, #087bb1);
  box-shadow: #8f9996 0px 0px 2px 1px;
  margin-bottom: 20px;
  .icons {
    margin-top: 5px;
  }
  img {
    width: 20px;
    height: 20px;
  }
}
.swiper {
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: #8f9996 1px 5px 20px 4px;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 18px;
    line-height: 150px;
    text-align: center;
    background: linear-gradient(to top, #b9bb99, #115b7e, #06435f);
  }
}
.btn {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
