<template>
  <div class="songitem van-hairline--bottom" @click="getSongUrlPlayer">
    <div class="index">
      <p>{{index+1}}</p>
    </div>
    <div class="content">
      <p class="name">
        {{songMsg.songName}}
        <span>{{songMsg.des}}</span>
      </p>
      <p class="album">{{songMsg.songAuthor}}-{{songMsg.album}}</p>
    </div>
    <div class="operation">
      <van-icon name="more-o" color="#BEBEBE" size="0.5rem" />
    </div>
  </div>
</template>

<script>
import { getSongDetail, getSongUrl } from '@/api/song'
export default {
  data () {
    return {
      songMsg: {

      }
    }
  },
  props: {
    songId: {
      type: [String, Number]
    },
    index: {
      type: Number
    }
  },
  created () {
    this.getSongMsg()
  },
  methods: {
    async getSongMsg () {
      const { data: res } = await getSongDetail(this.songId)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取' + this.songId + '歌曲失败' })
      }
      this.songMsg = {
        album: res.songs[0].al.name,
        songName: res.songs[0].name,
        des: res.songs[0].alia[0] ? '(' + res.songs[0].alia[0] + ')' : null,
        songAuthor: res.songs[0].ar.map((item) => { return item.name }).join('/'),
        songImgUrl: res.songs[0].al.picUrl
      }
    },
    // TODO:通过this.$emit传递给页面,需要改进
    async getSongUrlPlayer () {
      const { data: res } = await getSongUrl(this.songId)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲失败' })
      }
      console.log(res.data[0])
      this.songMsg.songUrl = res.data[0].url
      const song = {
        songId: this.songId,
        songImgUrl: this.songMsg.songImgUrl,
        songName: this.songMsg.songName,
        songAuthor: this.songMsg.songAuthor,
        songUrl: this.songMsg.songUrl,
        songAlbum: this.songMsg.album
      }
      this.$store.dispatch('toPlayList', song)
      this.$router.push({ name: 'Player', params: { id: this.songId } })
    }
  }
}
</script>

<style scoped lang="less">
.songitem{
  height: 1.2rem;
  display: flex;
  padding: 0.2rem 0;
  .index{
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      color: #696969;
      font-size: 0.3rem;
    }
  }
  .content{
    border-radius: 5px 5px 0 0 ;
    flex: 1;
    display: flex;
     max-width: 80%;

    flex-direction: column;

    justify-content: space-around;
    .name{
           overflow: hidden;
       white-space: nowrap;
      text-overflow: ellipsis;
      color:#696969;
      font-size: 0.35rem;
      span{
        color: #BEBEBE;
      }
    }
    .album{
                 overflow: hidden;
       white-space: nowrap;
      text-overflow: ellipsis;
      color: #BEBEBE;
      font-size: 0.3rem;
    }
  }
  .operation{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
  }
}
</style>
