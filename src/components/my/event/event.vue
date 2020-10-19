<template>
  <div id="event">
    <router-link to="" class="creator">@{{creator}}</router-link><span v-for="tag in tags" :key="tag.index">#{{tag}}#</span>
    <div class="msg">
      {{msg}}
    </div>
    <div class="img">
      <img :src="imgUrl" :alt="actName">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: [],
      msg: ''
    }
  },
  props: {
    actName: [String],
    childId: [Number, String],
    imgUrl: [String],
    componentName: [String],
    creator: [String],
    content: [String]
  },
  created () {
    this.getTags()
  },
  methods: {
    getTags () {
      const arr = this.content.split('#').filter((s) => {
        return s && s.trim()
      })
      this.msg = arr.splice(-1, 1).pop()
      this.tags = arr
    }
  }
}
</script>

<style lang="less" scoped>
#event{
  padding: 5px 10px;
  background-color: #F5F5F5;
  .creator{
    color: #6495ED;
    font-size: 12px;
  }
  span{
    color: #6495ED;
    font-size: 12px;
    margin: 0 2px;
  }
  .msg{
    font-size: 12px;
    color: #333;
    line-height: 1.5;
  }
  .img{
    max-width: 150px;
    img{
      width: 100%;
    }
  }
}
</style>
