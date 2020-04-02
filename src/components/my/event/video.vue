<template>
  <div id="video">
    <video-player
      ref="videoPlayer"
      class="video-player-box"
      :options="playerOptions"
      :playsinline="true"
    >

    </video-player>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playerOptions: {
        // videojs options
        width: '',
        muted: false,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: ''
      }
    }
  },
  methods: {
    getClientWidth () {
      this.playerOptions.width = document.body.clientWidth - 77
    }
  }
}
</script>

<style lang="less" scoped>

</style>
