module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  devServer: {
    proxy: {
      '/': {
        target: 'https://mapi.ykweb.xyz',
        changeOrigin: true,
        secure: true
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
  }

}
