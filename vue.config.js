module.exports = {
	devServer: {
	  overlay: {
	    warnings: false, //不显示警告
	    errors: false	//不显示错误
	  }
	},
	lintOnSave:false, //关闭eslint检查
	// 设置项目打包的公共路径
  publicPath: "./",
};
