<template>
  <div v-loading="isloading">
      <div>{{data}}</div>
      <button @click="update">更新</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: '',
      isloading: false
    }
  },
  methods: {
    update () {
      this.isloading = true
      setTimeout(() => {
        this.data = '用户数据'
        this.isloading = false
      }, 4000)
    }
  }
}
</script>

<style>

</style>
