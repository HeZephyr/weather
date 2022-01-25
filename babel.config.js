module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // 导入vant模块库
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};
