<template>
  <div class="recommend" @click="toPlayList">
    <div class="recommend-url">
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
    position: relative;
    box-sizing: border-box;
    padding: 0.1rem 0.16rem;
    box-sizing: border-box;
    border-bottom: 1px solid @bordercolor;

    &-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #646566;
        font-size: 0.6rem;
        word-wrap: break-word;
        padding-top: 0.1rem;
    }

    .recommend-url {
        position: relative;
        display: inline-flex;
        width: 90%;

        .recommend-img {
            font-size: 1rem;
            padding-right: 0.08rem;
        }

        .user-img {
            font-size: 0.8rem;
            position: absolute;
            right: -10%;
            top: 50%;
            transform: translateY(-50%);

            img {
                border-radius: 50%;
            }
        }

        i {

            img {
                width: 1em;
                height: 1em;
            }
        }

        .recommend-text {
          flex: 1;
          overflow: hidden;
            span:nth-child(1) {
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.35rem;
            }

            span:nth-child(2) {
                font-weight: lighter;
                white-space: nowrap;
                overflow: hidden;
                font-size: 0.30rem;
                text-overflow: ellipsis;
            }
        }

    }

}
</style>
