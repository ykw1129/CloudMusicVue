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
      <p>{{eventTime|dateFormat}}</p>
      <p>{{msg}}</p>
      <div class="main">
        <keep-alive>
          <components :is="eventTypecode" :childId="id" :posterUrl="poster"></components>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import eventvideo from '../my/event/video'
import mv from '../my/event/mv'
import song from '../my/event/song'
import playlist from '../my/event/playlist'
export default {
  data () {
    return {
      id: '',
      poster: ''
    }
  },
  components: {
    eventvideo,
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
    },
    urlId: {
    },
    imgUrl: {
      type: String
    }
  },
  created () {
    this.id = this.urlId
    this.poster = this.imgUrl
  },
  mounted () {

  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
#eventvideo{
    padding: 20px 16px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
            font-size: 12px;
        }
        &:nth-child(3){
          color:black;
          font-size: 8px;
        }
        }
        .main{
            width: 100%;
            border-radius: 5px;
            overflow: hidden;

            }
        }
    }

</style>
