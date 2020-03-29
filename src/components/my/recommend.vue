<template>
  <div class="recommend">
    <router-link
      class="recommend-url"
      to="url"
    >
      <i class="recommend-img">
        <img
          v-lazy="imgurl"
          alt="title"
        >
      </i>
      <div class="recommend-text">
        <span>{{title}}</span>
        <span>{{text}}</span>
      </div>
      <i class="user-img">
        <img
          v-lazy="userimg"
          alt="username"
        >
      </i>

    </router-link>
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
    text: String,
    url: String,
    userimg: String,
    username: String
  }
}
</script>

<style lang="less" scoped>
  img[lazy=loading] {
    background: gray;
    transition: all 0.3s;
  }
@bordercolor:#ebedf0;
.recommend{
    position: relative;
    box-sizing: border-box;
    padding: 10px 16px;
    border-bottom: 1px solid @bordercolor;
        &-text{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #646566;
    font-size: 0.6rem;
    word-wrap: break-word;
    padding-top: 4px;
    }
   .recommend-url{
      display: inline-flex;
      .recommend-img{
        font-size: 40px;
                padding-right: 8px;
      }
      .user-img{
        font-size: 30px;
        img{
                  border-radius: 50%;
        }
        span{
              color: #646566;
    font-size: 6px;
    word-wrap: break-word;
        }
      }

 i{

    img{
        width: 1em;
        height: 1em;
    }
    }

    span:nth-child(1){
      font-weight: bold;
    }
    span:nth-child(2){
      font-weight: lighter;
      width:15rem;
      white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    }

}
</style>
