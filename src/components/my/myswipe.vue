<template>
  <div>
   <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      height="159"
    >
      <van-swipe-item
      class="swipe-items"
        v-for="item in bannerlist"
        :key="item.bannerId"
      >
         <img :src="item.pic" :alt="item.typeTitle">
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
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取图片失败' })
      } else {
        console.log(res)
        this.bannerlist = res.banners
      }
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
.swipe-items{
    background-position: center 0;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    img{
      height: 100%;
      width: 100%;
    }
}
</style>
