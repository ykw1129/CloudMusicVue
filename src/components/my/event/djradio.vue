<template>
  <div id="radio">
    <img :src="radioImgUrl" :alt="radioName">
    <div class="right">
    <div class="top"><div class="icon van-hairline--surround">音乐故事</div> <span class="name">{{radioName}}</span></div>
    <div class="bottom"><sub>by</sub> <span>{{radioCreator}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radioId: '',
      radioCreator: '',
      radioName: '',
      radioImgUrl: ''
    }
  },
  props: {
    creator: [String],
    childId: [String, Number],
    imgUrl: [String],
    componentName: [String]
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.radioCreator = this.creator
      this.radioName = this.componentName
      this.radioImgUrl = this.imgUrl
      this.radioId = this.childId
    }
  }
}
</script>

<style lang="less" scoped>
.van-hairline--surround::after{
border-color: rgb(235, 32, 0);
border-radius: 3px;
}
#radio{
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
    font-size: 0.2rem!important;
    display: flex;
    justify-content: space-around;
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
      .sub{
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
