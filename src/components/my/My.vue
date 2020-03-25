<template>
  <div id="my">
    <van-row class="search">
      <van-col span="4">
        <img
          src="../../assets/image/logo.jpg"
          alt="user-icon"
        >
      </van-col>
      <van-col span="20">
        <van-search
          v-model="value"
          shape="round"
          background="rgb(235,32,0)"
          placeholder="请输入歌曲，歌手，专辑"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.$store.dispatch('getUserStatus')
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.search{
    background-color: rgb(235, 32, 0);
  height: 54px;
  overflow: hidden;
.van-col:nth-child(1){
  height: 100%;
  text-align: center;
  img{
    height: 100%;
    border-radius: 50%;
  }
}
}

</style>
