<template>
<!-- 查询详情页 -->
  <div id="search">
        <van-nav-bar
      :title="title"
      left-arrow
    >
      <template #left>
          <van-icon
            @click="back"
            name="arrow-left"
            size="18"
            color="rgb(235, 32, 0)"
          />
      </template>
      <template #right>
        <van-icon
          name="envelop-o"
          size="18"
          color="rgb(235, 32, 0)"
        />
      </template>
    </van-nav-bar>
    {{$route.query.keywords}}
  </div>
</template>

<script>
import { Search } from '../../api/search'
export default {
  data () {
    return {
      title: '查询结果',
      searchQuery: {
        keywords: '',
        limit: 30,
        offset: 0,
        type: 1
      }
    }
  },
  methods: {
    //  页面后退
    back () {
      history.go(-1)
    },
    // 获取搜索结果
    async getSearch (data) {
      const { data: res } = await Search(data)
      if (res.code !== 200) {
      } else {
        console.log(res)
      }
    }
  },
  created () {
    this.searchQuery.keywords = this.$route.query.keywords
  },
  mounted () {
    this.getSearch(this.searchQuery)
  }
}
</script>

<style>

</style>
