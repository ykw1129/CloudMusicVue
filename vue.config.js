module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'https://mapi.ykweb.xyz',
        changeOrigin: true,
        secure: true
      }
    }
  }

}
