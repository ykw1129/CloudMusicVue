<template>
  <div class="recommend">
    <i>
      <img
        v-lazy="imgurl"
        alt="title"
      >
    </i>
    <div class="recommend-text">
      <span>{{title}}</span>
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    imgurl: String,
    title: String,
    text: String
  }
}
</script>

<style lang="less" scoped>
@bordercolor:#ebedf0;
.recommend{
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 10px 16px;
    border: 1px solid @bordercolor;
    i{
        font-size: 40px;
        padding-right: 8px;
    img{
        width: 1em;
        height: 1em;
    }
    }
    &-text{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #646566;
    font-size: 12px;
    word-wrap: break-word;
    padding-top: 8px;

    }

}
</style>
