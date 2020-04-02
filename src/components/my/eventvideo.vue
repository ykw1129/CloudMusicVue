<template>
  <div id="eventvideo" @resize="getClientWidth">
    <van-image
      class="event-logo"
      :src="avatarUrl"
      type="contain"
      height="45"
      width="45"
      round
    />
    <div class="event-main">
      <p>{{creator}}</p>
      <p>{{eventTime}}</p>
      <p>{{msg}}</p>
      <div class="main">
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
      eventType: ['mv', 'event', 'song', 'video'],
      playerOptions: {
        // videojs options
        width: '',
        muted: false,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: ''
      }
    }
  },
  props: {
    eventTypecode: {
      type: String
    },
    creator: {
      type: String
    },
    eventTime: {
      type: Number
    },
    msg: {
      type: String
    },
    avatarUrl: {
      type: String
    }
  },
  created () {
    this.getClientWidth()
  },
  mounted () {
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
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
#eventvideo{
    height: 300px;
    padding: 20px 16px;
    display: flex;
    flex-direction: row;
    .event-logo{
        width: 45px;
    }
    .event-main{
        flex: 1;
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
        &:nth-child(3){
          color:black;
          font-size: 8px;
        }
        }
        .main{
            width: 100%;
            border-radius: 15px;
            overflow: hidden;
                .video-js{
                  width: 100%
            }
        }
    }
}

</style>
