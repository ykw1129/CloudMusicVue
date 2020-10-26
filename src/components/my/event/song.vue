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
import { getSongDetail, getSongUrl } from '@/api/song'
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
    this.getDetail()
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
    async getDetail () {
      const { data: res } = await getSongDetail(this.songId)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲高清图片失败' })
      }
      this.songHdImgUrl = res.songs[0].al.picUrl
    },
    async getUrl () {
      const { data: res } = await getSongUrl(this.songId)
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
      this.getUrl()
    }
  }
}
</script>

<style lang="less" scoped>
#song{
  padding: 0.04rem 0.1rem;
  display: flex;
  background: #F5F5F5;
  &>img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
    box-sizing: content-box;
  }
  .song_right{
    padding-left: 0.2rem;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    &>span:nth-child(1){
      font-size: 0.24rem;
      display: inline-block;
      max-width: 5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &>span:nth-child(2){
            display: inline-block;
      max-width: 5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.2rem;
      color: rgba(0, 0, 0, 0.6);
      -webkit-text-size-adjust:none;
    }
  }
}
</style>
