<template>
    <div id="album">
    <img :src="albumImgUrl" :alt="albumName">
    <div class="album_right">
    <span>{{albumName}}</span>
    <span>{{albumAuthor}}</span>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      albumImgUrl: '',
      albumName: '',
      albumAuthor: ''
    }
  },
  props: {
    childId: [Number, String],
    imgUrl: [String],
    componentName: [String],
    creator: [String]
  },
  methods: {
    init () {
      this.albumId = this.childId
      this.albumName = this.componentName
      this.albumAuthor = this.creator
      this.albumImgUrl = this.imgUrl
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
#album{
  padding: 4px 10px;
  display: flex;
  background: #F5F5F5;
  &>img{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-sizing: content-box;
  }
  .album_right{
    padding-left: 10px;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    &>span:nth-child(1){
      font-size: 12px;
      display: inline-block;
      max-width: 220px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &>span:nth-child(2){
            display: inline-block;
      max-width: 220px;
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
