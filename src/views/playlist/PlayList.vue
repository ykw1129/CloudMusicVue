<template>
  <div id="playlist" :style="{backgroundColor:mainColor}">
    <van-nav-bar title="歌单" left-text="返回" left-arrow @click-left="back">
        <template #left>
    <van-icon name="arrow-left" size="0.5rem" color="rgb(235, 32, 0)" />
  </template>
  <template #right>
    <van-icon name="search" size="0.5rem"  color="rgb(235, 32, 0)"/>
  </template>
</van-nav-bar>
  <div class="detail">
    <div class="left">
      <img :src="playlistCoverImg" alt="">
    </div>

  </div>
  </div>
</template>

<script>
import analyze from 'rgbaster'
export default {
  data () {
    return {
      playlistId: '',
      mainColor: '',
      playlistCoverImg: '',
      playlistCreator: '',
      playlistName: ''
    }
  },
  methods: {
    async getPlayList () {
      const { data: res } = await this.$http.get('/playlist/detail', { params: { id: window.location.hash.substr(11) } })
      if (res.code !== 200) return this.$notify({ type: 'danger', message: '获取歌单失败！' })
      this.playlistCoverImg = res.playlist.coverImgUrl
      this.getMainColor(res.playlist.coverImgUrl)
      console.log(res)
    },
    back () {
      history.go(-1)
    },
    // 选择主色号
    async getMainColor (url) {
      const res = await analyze(url, {
        ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'],
        scale: 0.6
      })
      this.mainColor = res[10].color
    }
  },
  created () {
    this.getPlayList()
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
#playlist{
  .detail{
    padding: 0.2rem 0.1rem;
    img{
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
