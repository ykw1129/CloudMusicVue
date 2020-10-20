<template>
  <div id="eventvideo">
    <van-image
      class="event-logo"
      :src="avatarUrl"
      type="contain"
      round
    />
    <div class="event-main">
      <p>{{creator}} <span>{{des}}:</span></p>
      <p>{{eventTime|dateFormatAccurate}}</p>
      <p>{{msg}}</p>
      <div class="main">
        <keep-alive>
          <components :is="eventTypecode" :childId="urlId" :imgUrl="imgUrl" :creator="bycreator" :componentName="componentName" :content="content" :actName="actName"></components>
        </keep-alive>
      </div>
      <div class="operation">
        <div class="item"><van-icon name="share-o" size="0.3rem"/><span>转发</span></div>
        <div class="item"><van-icon name="comment-o" size="0.3rem" /><span>评论</span></div>
        <div class="item"><van-icon name="good-job-o" size="0.3rem"/><span>点赞</span></div>
      </div>
    </div>

  </div>
</template>

<script>
import myvideo from '../my/event/video'
import mv from '../my/event/mv'
import song from '../my/event/song'
import event from '../my/event/event'
import album from '../my/event/album'
import djRadio from '../my/event/djradio'
import playlist from '../my/event/playlist'
export default {
  data () {
    return {
    }
  },
  components: {
    myvideo,
    mv,
    song,
    playlist,
    album,
    event,
    djRadio
  },
  props: {
    des: {
      type: String
    },
    componentName: {
      type: String
    },
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
    },
    bycreator: {
      type: String
    },
    content: {
      type: String
    },
    actName: { type: String }
  },
  created () {
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
    padding: 0.4rem 0.32rem;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .event-logo{
        width: 1rem;
        height:1rem;
    }
    .event-main{
        flex: 1;
        height: 100%;
        p{
            padding: 0.12rem;
        &:nth-child(1){
            color: #6495ED;
            font-size: 0.24rem;
            span{
              color: #666666;
              font-size: 0.2rem;
              padding-left: 0.02rem;
            }
        }
        &:nth-child(2){
            color: #999999;
            font-size: 0.24rem;
        }
        &:nth-child(3){
          color:black;
          font-size: 0.16rem;
        }
        }
        .main{
            width: 100%;
            border-radius: 3px;
            overflow: hidden;

            }
            .operation{
              margin-top: 0.1rem;
              justify-content: space-between;
              display: flex;
              width: 4rem;
              .item{
                cursor: pointer;
                vertical-align: middle;
                /deep/ .van-icon{
                  vertical-align: middle;
                }
                span{
                  vertical-align: middle;
                  font-size: 0.24rem;
                }
              }
            }
        }
        /deep/ .van-image--round img{
          width: 100%;
          border-radius: 50%;
          height: 100%;
        }
    }

</style>
