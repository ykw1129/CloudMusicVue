<template>
  <div id="song" @click="toPlayer">
    <img :src="songImgUrl" :alt="songName">
    <div class="song_right">
    <span>{{songName}}</span>
    <span>{{songAuther}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songId: '',
      songImgUrl: '',
      songName: '',
      songAuther: ''
    }
  },
  props: {
    childId: [Number]

  },
  created () {
    this.songId = this.childId
    this.getSongDetail()
  },
  mounted () {

  },
  methods: {
    async getSongDetail () {
      const { data: res } = await this.$http.get('/song/detail', {
        params: { ids: this.songId }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲失败' })
      }
      this.songImgUrl = res.songs[0].al.picUrl
      this.songName = res.songs[0].name
      this.songAuther = res.songs[0].ar.map(value => {
        return value.name
      }).join('/')
    },
    toPlayer (id) {
      id = this.songId
      /*  const song = {
        songId: this.songId,
        songImgUrl: this.songImgUrl,
        songName: this.songName,
        songAuther: this.songAuther
      } */
    }
  }
}
</script>

<style lang="less" scoped>
#song{
  padding: 4px 10px;
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  &>img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-sizing: content-box;
  }
  .song_right{
    padding-left: 5px;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    &>span:nth-child(1){
      font-size: 12px;
    }
    &>span:nth-child(2){
      font-size: 10px;
      color: rgba(0, 0, 0, 0.6);
      -webkit-text-size-adjust:none;
    }
  }
}
</style>
