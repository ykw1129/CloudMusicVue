<template>
  <div id="playlist">
    <img :src="playlistImgUrl" :alt="playlistName">
    <div class="right">
    <div class="top"><div class="icon van-hairline--surround">歌单</div> <span class="name">{{playlistName}}</span></div>
    <div class="bottom"><sub>by</sub> <span>{{playlistAuthor}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playlistName: '',
      playlistAuthor: '',
      playlistImgUrl: '',
      playlistId: ''
    }
  },
  props: {
    creator: [String],
    childId: [String, Number],
    imgUrl: [String],
    componentName: [String]
  },
  methods: {
    init () {
      this.playlistId = this.childId
      this.playlistName = this.componentName
      this.playlistAuthor = this.creator
      this.playlistImgUrl = this.imgUrl
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.van-hairline--surround::after{
border-color: rgb(235, 32, 0);
border-radius: 3px;
}
#playlist{
  padding: 4px 10px;
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  &>img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-sizing: content-box;
  }
  .right{
    padding-left: 10px;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
   .top{
     display: flex;
      .icon{
        margin-right: 10px;
        padding: 2px;
        display: inline-block;
        font-size: 8px;
        color: rgb(235, 32, 0);
      }
      .name{
      font-size: 12px;
      font-weight: bold;
      }

    }
    .bottom{
      color: rgba(0, 0, 0, 0.4);
      sub{
        font-size: 12px;
      }
      span{
      font-size: 10px;
      -webkit-text-size-adjust:none;
      }

    }
  }
}
</style>
