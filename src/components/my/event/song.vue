<template>
  <div id="song" @click="toPlayer">
    <img :src="songImgUrl" :alt="songName">
    <div class="song_right">
    <span>{{songName}}</span>
    <span>{{songAuthor}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songImgUrl: '',
      songName: '',
      songAuthor: '',
      songUrl: '',
      songHdImgUrl: ''
    }
  },
  props: {
    childId: [Number, String],
    imgUrl: [String],
    componentName: [String],
    creator: [String]
  },
  created () {
    this.init()
    this.getSongDetail()
  },
  mounted () {

  },
  methods: {
    init () {
      this.songId = this.childId
      this.songName = this.componentName
      this.songAuthor = this.creator
      this.songImgUrl = this.imgUrl
    },
    async getSongDetail () {
      const { data: res } = await this.$http.get('/song/detail', {
        params: { ids: this.songId }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲高清图片失败' })
      }
      this.songHdImgUrl = res.songs[0].al.picUrl
    },
    async getSongUrl () {
      const { data: res } = await this.$http.get('/song/url', {
        params: { id: this.songId }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲失败' })
      }
      this.songUrl = res.data[0].url
      const song = {
        songId: this.songId,
        songImgUrl: this.songHdImgUrl,
        songName: this.songName,
        songAuthor: this.songAuthor,
        songUrl: this.songUrl
      }
      this.$store.dispatch('toPlayList', song)
      this.$router.push({ name: 'Player' })
    },
    toPlayer () {
      this.getSongUrl()
    }
  }
}
</script>

<style lang="less" scoped>
#song{
  padding: 4px 10px;
  display: flex;
  background: #F5F5F5;
  &>img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-sizing: content-box;
  }
  .song_right{
    padding-left: 10px;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    &>span:nth-child(1){
      font-size: 12px;
      display: inline-block;
      max-width: 230px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &>span:nth-child(2){
            display: inline-block;
      max-width: 230px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 10px;
      color: rgba(0, 0, 0, 0.6);
      -webkit-text-size-adjust:none;
    }
  }
}
</style>
