<template>
  <div class="wrapper">
    <div class="nullview"></div>
    <div class="header-wrapper">
			<div class="header-title">
			  <span>{{nowDate}} {{nowWeek}} {{nowTime}}</span>
			</div>
      <div class="header-title">
        <span>空气状况-{{ airText }}</span>
        <span>地区-{{ city }}</span>
      </div>
      <div class="header-text">
        <span>{{ win }}:{{ winSpeed }}</span>
        <span>{{ weather }}</span>
      </div>
      <div class="weather-advice">{{ weatherAdvice }}</div>
    </div>
    <div class="body-wrapper">
      <div class="body">
        <div class="data-wrapper">
          <div class="data">
            <img class="data-logo" src="../static/images/wendu.png" />
            <div class="data-text">
              <div class="data-title">温度</div>
              <div class="data-value">{{ tem }}</div>
            </div>
          </div>
          <div class="data">
            <img class="data-logo" src="../static/images/shidu.png" />
            <div class="data-text">
              <div class="data-title">湿度</div>
              <div class="data-value">{{ hum }}</div>
            </div>
          </div>
        </div>
        <div class="data-wrapper">
          <div class="data">
            <img class="data-logo" src="../static/images/guang.png" />
            <div class="data-text">
              <div class="data-title">光照度</div>
              <div class="data-value">{{ lux }}</div>
            </div>
          </div>
          <div class="data">
            <img class="data-logo" src="../static/images/wled.png" />
            <div class="data-text">
              <div class="data-title">客厅灯</div>
              <div class="data-value" id="dialog">
                <van-switch
                  v-model="kled"
                  @change="kledchange"
                  active-color="#95EC69"
                  inactive-color="#dcdee0"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="data-wrapper">
          <div class="data">
            <img class="data-logo" src="../static/images/woled.png" />
            <div class="data-text">
              <div class="data-title">卧室灯</div>
              <div class="data-value">
                <van-switch
                  v-model="bled"
                  @change="bledchange"
                  active-color="#95EC69"
                  inactive-color="#dcdee0"
                />
              </div>
            </div>
          </div>
          <div class="data">
            <img class="data-logo" src="../static/images/feng.png" />
            <div class="data-text">
              <div class="data-title">风扇</div>
              <div class="data-value">
                <van-switch
                  v-model="feng"
                  @change="fledchange"
                  active-color="#95EC69"
                  inactive-color="#dcdee0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const that = this;
    const mykey = '161cff18337a40f7a811b267a8727712';
    // 从onenet平台获取数据
    const api = new OneNetApi(that.apikey);
    api.getDataStreams(that.devicesid).done(function(data) {
      // console.log('数据请求成功，服务器返回data为：', data);
      const tempdatas = data.data[0];
      const humdatas = data.data[1];
      const luxdatas = data.data[2];
      // vue写法
      that.lux = parseInt(luxdatas.current_value) + "lux";
    });
		// 配置高德地图api
    that.$AMapLoader
      .load({
				// 申请好的Web端开发者Key，首次调用 load 时必填
				key: '171cd49f1dfbbd7c87d2dd4dc507356c',
        version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '1.3.2' // Loca 版本，缺省 1.3.2
        }
      })
      .then((AMap) => {
        // const map = new AMap.Map('container', {
        //   resizeEnable: true
        // })
        AMap.plugin('AMap.Geolocation', function() {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: false, // 是否使用高精度定位，默认:true
            timeout: 10000 // 超过10秒后停止定位，默认：5s
          });
          geolocation.getCurrentPosition(function(status, result) {
            if (status === 'complete') {
              // console.log(result);
              // console.log(result.position.lat);
              const longitude = result.position.lng; // 获取到的经度
              const latitude = result.position.lat; // 获取到的纬度
              that
                .$axios({
                  url: `https://geoapi.heweather.net/v2/city/lookup?location=${longitude},${latitude}&key=${mykey}`, // 天气api
                  method: 'get'
                })
                .then((res) => {
                  const cityid = res.data.location[0].id;
                  that
                    .$axios({
                      url: `https://v0.yiketianqi.com/api?version=v61&appid=31143983&appsecret=VisL2wEO&cityid=${cityid}`, // 天气api
                      method: 'get'
                    })
                    .then((res) => {
                      //   console.log('wether',res)
                      that.city = res.data.city;
                      that.airText = res.data.air_level;
                      that.airValue = res.data.air;
                      that.weather = res.data.wea;
                      that.weatherAdvice = res.data.air_tips;
                      that.win = res.data.win;
                      that.winSpeed = res.data.win_speed;
											that.tem = res.data.tem + "℃";
											that.hum = res.data.humidity;
                    });
                });
            } else {
              // console.log('高德地图使用失败');
            }
          });
        });
      })
      .catch((e) => {
        console.log('高德地图', e);
      });
  },
  data() {
    return {
			nowDate: "",    // 当前日期
			nowTime: "",    // 当前时间
      nowWeek: "",    // 当前星期
      devicesid: '624519850', // 设备id
      apikey: '2oc6=0XgNsKFW8XVsGcpSJmdlL0=', // 该设备的apikey
      // 请求结果返回的数据

      city: '请求中', // 城市
      airText: '请求中', // 空气优良
      airValue: '', // 空气指数
      weather: '请求中', // 天气
      weatherAdvice: '请求中', // 天气建议
      win: '请求中', // 风向
      winSpeed: '请求中', // 风力等级
      tem: '请求中', // 温度
      hum: '请求中', // 湿度
      lux: '请求中', // 光照强度

      // switch开关默认状态
      kled: false,
      bled: false,
      feng: false
    };
  },
  methods: {
    kledchange() {
      const that = this;
			// 基于OneNetApi，控制办公设备。
      const api = new OneNetApi(that.apikey);
      if (that.kled) {
        api.sendCommand(that.devicesid, '111').done(function(data) {
          // console.log('api调用完成，服务器返回data为：', data);
          if (data.errno === 10) {
            that.$dialog.alert({
              message: '设备不在线'
            });
            that.kled = false;
          } else {
            that.$toast.success('打开成功');
          }
        });
      } else {
        api.sendCommand(that.devicesid, '110').done(function(data) {
          that.$toast.success('关闭成功');
        });
      }
    },
    // 控制卧室灯开关
    bledchange() {
      const that = this;
      const api = new OneNetApi(that.apikey);
      if (that.bled) {
        api.sendCommand(that.devicesid, '121').done(function(data) {
          // console.log('api调用完成，服务器返回data为：', data);
          if (data.errno === 10) {
            that.$dialog.alert({
              message: '设备不在线'
            });
            that.bled = false;
          } else {
            that.$toast.success('打开成功');
          }
        });
      } else {
        api.sendCommand(that.devicesid, '120').done(function(data) {
          that.$toast.success('关闭成功');
        });
      }
    },
    // 控制风扇开关
    fledchange() {
      const that = this;
      const api = new OneNetApi(that.apikey);
      if (that.feng) {
        api.sendCommand(that.devicesid, '131').done(function(data) {
				// console.log('api调用完成，服务器返回data为：', data);
				if (data.errno === 10) {
					that.$dialog.alert({
						message: '设备不在线'
					});
					that.feng = false;
				} else {
					that.$toast.success('打开成功');
          }
        });
      } else {
        console.log('在OFF的状态下');
        api.sendCommand(that.devicesid, '130').done(function(data) {
          // console.log('api调用完成，服务器返回data为：', data);
          if (data.errno !== 10) {
            that.$toast.success('关闭成功');
          }
        });
      }
    },
		dealWithTime(data) { // 获取当前时间
			let formatDateTime;
			let Y = data.getFullYear();
			let M = data.getMonth() + 1;
			let D = data.getDate();
			let H = data.getHours();
			let Min = data.getMinutes();
			let S = data.getSeconds();
			let W = data.getDay();
			H = H < 10 ? "0" + H : H;
			Min = Min < 10 ? "0" + Min : Min;
			S = S < 10 ? "0" + S : S;
			switch (W) {
				case 0:
					W = "日";
					break;
				case 1:
					W = "一";
					break;
				case 2:
					W = "二";
					break;
				case 3:
					W = "三";
					break;
				case 4:
					W = "四";
					break;
				case 5:
					W = "五";
					break;
				case 6:
					W = "六";
					break;
				default:
					break;
			}
			this.nowDate = Y + "年" + M + "月" + D + "日 ";
			this.nowWeek = "周" + W ; 
			this.nowTime = H + ":" + Min + ":" + S;
			// formatDateTime = Y + "年" + M + "月" + D + "日 " + " 周" +W + H + ":" + Min + ":" + S;
		},
  },
	mounted() { 
		// 页面加载完后显示当前时间
		this.dealWithTime(new Date())
		// 定时刷新时间
		this.timer = setInterval(()=> {
			 this.dealWithTime(new Date()) // 修改数据date
		}, 500)
	}, 
	destroyed() {
		if (this.timer) {  // 注意在vue实例销毁前，清除我们的定时器
			clearInterval(this.timer);
		}
	}
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 600px;
  padding: 15px;
  .nullview {
    height: 30px;
    width: 100%;
  }
  .header-wrapper {
    height: 28%;
    background: linear-gradient(to top, #b9bb99, #115b7e, #06435f);
    border-radius: 20px;
    color: #fff;
    box-shadow: #d6d6d6 0px 0px 5px;
    padding: 15px 30px;
    .header-title {
      font-size: 20px;
      display: flex;
      justify-content: space-between;
    }
    .header-text {
      margin-top: 10px;
      font-size: 20px;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
    }
    .weather-advice {
      margin-top: 15px;
      font-size: 18px;
    }
  }
  .data-wrapper {
    height: 20%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .data {
      background-color: #fff;
      width: 43%;
      height: 80px;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      padding: 0 8px;
      box-shadow: #d6d6d6 0px 0px 5px;
      .data-logo {
        height: 45px;
        width: 40px;
        margin-top: 15px;
      }
      .data-text {
        margin-top: 10px;
        color: #7f7f7f;
        text-align: center;
        .data-value {
          margin-top: 5px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
