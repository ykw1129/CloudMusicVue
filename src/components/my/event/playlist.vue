<template>
  <div id="playlist" @click="toPlayListPage">
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
    },
    toPlayListPage () {
      this.$router.push({ name: 'PlayList', params: { id: this.playlistId } })
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
  padding: 0.08rem 0.1rem;
  display: flex;
  background: #F5F5F5;
  &>img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
    box-sizing: content-box;
  }
  .right{
    padding-left: 0.2rem;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
   .top{
     display: flex;
      .icon{
        margin-right: 0.2rem;
        padding: 0.04rem;
        display: inline-block;
        font-size: 0.16rem;
        color: rgb(235, 32, 0);
      }
      .name{
      font-size: 0.24rem;
      font-weight: bold;
      }

    }
    .bottom{
      color: rgba(0, 0, 0, 0.4);
      sub{
        font-size: 0.24rem;
      }
      span{
      font-size: 0.2rem;
      -webkit-text-size-adjust:none;
      }

    }
  }
}
</style>
