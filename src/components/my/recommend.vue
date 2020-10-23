<template>
  <div class="recommend" @click="toPlayList">
    <div class="recommend-url">
        <img
          v-lazy="imgurl+'?param=100y100'"
          alt="title"
        >
      <div class="recommend-text">
        <span>{{title}}</span>
        <span>{{text}}</span>
      </div>
      <i class="user-img">
        <img
          v-lazy="userimg+'?param=100y100'"
          alt="username"
        >
      </i>
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
    text: String,
    url: String,
    userimg: String,
    username: String,
    id: [String, Number]
  },
  methods: {
    toPlayList () {
      this.$router.push({ name: 'PlayList', params: { id: this.id } })
    }
  }
}
</script>

<style lang="less" scoped>
img[lazy=loading] {
    background: gray;
    transition: all 0.3s;
}

@bordercolor: #ebedf0;

.recommend {
    box-sizing: border-box;
    padding: 0.16rem 0.16rem;
    box-sizing: border-box;
    border-bottom: 1px solid @bordercolor;

    &-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #646566;
        font-size: 0.6rem;
        word-wrap: break-word;
    }

    .recommend-url {
        position: relative;
        display: flex;
        width: 92%;

        .user-img {
            font-size: 0.8rem;
            position: absolute;
            right: -10%;
            top: 50%;
            transform: translateY(-50%);

            img {
              width: 1em;
              height: 1em;
              vertical-align: middle;
                border-radius: 50%;
            }
        }
            img {
                width: 1rem;
                height: 1rem;
                vertical-align: baseline;
                padding-right: 0.08rem;
            }

        .recommend-text {
          flex: 1;
          vertical-align: bottom;
          height: 0.9rem;
            span:nth-child(1) {
              line-height: 1.2;
                font-weight: bold;
                white-space: nowrap;
                overflow-x: hidden;
                 max-width: 7rem;
                text-overflow: ellipsis;
                font-size: 0.35rem;
            }

            span:nth-child(2) {
                line-height: 1.2;
                font-weight: lighter;
                white-space: nowrap;
                overflow: hidden;
                max-width: 7rem;
                font-size: 0.32rem;
                text-overflow: ellipsis;
            }
        }

    }

}
</style>
