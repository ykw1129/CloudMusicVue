<template>
  <div class="container">

    <van-tabbar v-model="active" :route="true">
      <van-tabbar-item icon="home-o" to="/home/my">我的</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/find">发现</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/village">云村</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
</style>
