<template>
  <div>
   <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      height="159"
    >
      <van-swipe-item
        v-for="item in bannerlist"
        :key="item.bannerId"
      >
        <van-image
          :src="item.pic"
          type="contain"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bannerlist: [],
      phoneType: 1
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    // 轮播图
    async getBanner () {
      const { data: res } = await this.$http.get('/banner', {
        params: { type: this.phoneType }
      })
      console.log(res)
      this.bannerlist = res.banners
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>
