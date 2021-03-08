module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'music', // 输出文件目录
  devServer: {
    proxy: {
      '/': {
        target: 'http://39.96.92.113:3000/',
        changeOrigin: true,
        secure: true
      }
    }
  },
  configureWebpack: config => {
    let settings = {}
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      settings = {
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex'
        }
      }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
      settings = {}
    }
    return settings
  }

}
