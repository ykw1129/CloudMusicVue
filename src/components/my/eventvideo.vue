<template>
  <div id="eventvideo">
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
        <components></components>
      </div>
    </div>
  </div>
</template>

<script>
import video from '../my/event/video'
import mv from '../my/event/mv'
import song from '../my/event/song'
import playlist from '../my/event/playlist'
export default {
  data () {
    return {
      eventType: ['mv', 'event', 'song', 'video', 'playlist']
    }
  },
  components: {
    video,
    mv,
    song,
    playlist
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
  },
  mounted () {
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {

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

            }
        }
    }

</style>
