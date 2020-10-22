<template>
  <div class="songitem van-hairline--bottom">
    <div class="index">
      <p>{{index+1}}</p>
    </div>
    <div class="content">
      <p class="name">{{songMsg.name}}<span>{{songMsg.des}}</span></p>
      <p class="album">{{songMsg.singer}}-{{songMsg.album}}</p>
    </div>
    <div class="operation">
      <van-icon name="more-o" />
    </div>
  </div>
</template>

<script>
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
      const { data: res } = await this.$http.get('/song/detail', {
        params: { ids: this.songId }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取' + this.songId + '歌曲失败' })
      }
      this.songMsg = {
        album: res.songs[0].al.name,
        name: res.songs[0].name,
        des: res.songs[0].alia[0] ? '(' + res.songs[0].alia[0] + ')' : null,
        singer: res.songs[0].ar.map((item) => { return item.name }).join('/')
      }
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
