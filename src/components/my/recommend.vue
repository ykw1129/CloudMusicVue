<template>
    <div class="recommend">
        <img v-lazy="imgurl" alt="title">
        <p>{{title}}</p>
        <span>{{text}}</span>
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

</style>
