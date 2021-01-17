module.exports = {
  devServer: {
    proxy: {
      '/api': { //凡是以api开头的请求走代理
        target: 'http://47.110.234.216:40001',
        changeOrigin: true
      },
    }
  }
}