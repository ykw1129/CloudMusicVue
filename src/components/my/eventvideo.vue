<template>
  <div id="eventvideo">
    <van-image
      class="event-logo"
      src="https://p3.music.126.net/-jXdovptMqKbGTqNEyuSNQ==/109951164845855380.jpg"
      type="contain"
      height="45"
      width="45"
      round
    />
    <div class="event-main">
      <p>这是我的名字</p>
      <p>这是日期</p>
      <div class="video">
        <video-player
          ref="videoPlayer"
          class="video-player-box"
          :options="playerOptions"
          :playsinline="true"
        >

        </video-player>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playerOptions: {
        // videojs options
        height: 250,
        width: 320,
        muted: true,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: 'http://p4.music.126.net/HkESOXh-Y-vai1pZBGQHnA==/109951163573686211.jpg'
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<style lang="less" scoped>
#eventvideo{
    height: 250px;
    padding: 20px 16px;
    display: flex;
    flex-direction: row;
    .event-logo{
        width: 100%;
    }
    .event-main{
        height: 100%;
        p{
            padding: 6px;
        &:nth-child(1){
            color: #666666;
            font-size: 12px;
        }
        &:nth-child(2){
            color: #999999;
            font-size: 6px;
        }
        }
        .video{
            width: 100%;
            height: 100%;
            .video-player-box{
                .video-js .vjs-icon-placeholder {
                        width: 100%;
                        height: 100%;
                        display: block;
}
            }
        }
    }
}

</style>
