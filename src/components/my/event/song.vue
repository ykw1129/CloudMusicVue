<template>
  <div id="song">
    <img src="http://p1.music.126.net/-jXdovptMqKbGTqNEyuSNQ==/109951164845855380.jpg" alt="">
    <div class="song_right">
    <span>我是歌的名字</span>
    <span>我是歌手名字</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

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
