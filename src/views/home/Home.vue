<template>
  <div>
     <router-view/>
     <div class="wrap">
       <van-tabbar v-model="active" route>
          <van-tabbar-item icon="home-o" to="/my" name="my">我的</van-tabbar-item>
          <van-tabbar-item icon="search" to="/find" name="find">发现</van-tabbar-item>
          <van-tabbar-item icon="friends-o" to="/village" name="village">云村</van-tabbar-item>
     </van-tabbar>
     </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'my'
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
.wrap{
  height: 50px;
}
</style>
