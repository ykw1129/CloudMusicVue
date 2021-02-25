<template>
  <!-- 查询详情页 -->
  <div id="search">
    <van-nav-bar :title="title" left-arrow>
      <template #left>
        <van-icon @click="back" name="arrow-left" size="18" color="rgb(235, 32, 0)" />
      </template>
      <template #right>
        <van-icon name="envelop-o" size="18" color="rgb(235, 32, 0)" />
      </template>
    </van-nav-bar>
    <van-tabs
      swipeable
      @rendered="getSearch()"
      sticky
      type="card"
      v-model="active"
      @change="switchTab"
    >
      <van-tab title="单曲" name="1">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[0].loading"
            :finished="typeList[0].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.songs" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
                <p class="describe">
                  <span class="artists">{{item.artists|getArtists}}</span>
                  -
                  <span class="album">{{item.album.name}}</span>
                </p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="专辑" name="10">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[1].loading"
            :finished="typeList[1].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.albums" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="歌手" name="100">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[2].loading"
            :finished="typeList[2].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.artists" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="歌单" name="1000">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[3].loading"
            :finished="typeList[3].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.playlists" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="用户" name="1002">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[4].loading"
            :finished="typeList[4].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.userprofiles" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="MV" name="1004">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[5].loading"
            :finished="typeList[5].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.mvs" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="歌词" name="1006">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[6].loading"
            :finished="typeList[6].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.songs" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="电台" name="1009">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[7].loading"
            :finished="typeList[7].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.djRadios" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="视频" name="1014">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[8].loading"
            :finished="typeList[8].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.videos" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="综合" name="1018">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list
            v-model="typeList[9].loading"
            :finished="typeList[9].finished"
            finished-text="没有更多了"
            @load="loadSearch"
          >
            <van-cell v-for="item in resultList.albums" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Search } from '../../api/search'
export default {
  data () {
    return {
      title: '查询结果',
      active: '1',
      searchQuery: {
        keywords: '',
        limit: 30,
        offset: 0,
        type: 1
      },
      typeList: [
        { type: 1, name: 'songs', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 10, name: 'albums', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 100, name: 'artists', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1000, name: 'playlists', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1002, name: 'userprofiles', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1004, name: 'mvs', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1006, name: 'songs', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1009, name: 'djRadios', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1014, name: 'videos', finished: false, loading: false, hasMore: false, pagination: 0 },
        { type: 1018, name: 'albums', finished: false, loading: false, hasMore: false, pagination: 0 }],
      resultList: {},
      refreshing: false
    }
  },
  filters: {
    getArtists (val) {
      if (val) {
        const arr = val.map((item) => {
          return item.name
        })
        return arr.join('/')
      } else {
        return '未知歌手'
      }
    }
  },
  methods: {
    //  页面后退
    back () {
      history.go(-1)
    },
    // 获取搜索结果
    getSearch () {
      this.typeList.forEach(async item => {
        if (parseInt(this.active) === item.type) {
          item.loading = true
          item.finished = true
          this.searchQuery.offset = 0
          this.searchQuery.type = this.active
          const { data: res } = await Search(this.searchQuery)
          if (res.code !== 200) {
            this.$notify({ type: 'danger', message: '获取搜索结果失败' })
            item.loading = false
          } else {
            console.log(res.result)
            this.resultList[item.name] = res.result[item.name]
            item.loading = false
            item.hasMore = res.result.hasMore
            item.hasMore ? item.finished = false : item.finished = true
          }
        }
      })
    },
    loadSearch () {
      this.typeList.forEach(async item => {
        if (parseInt(this.active) === item.type) {
          if (item.hasMore) {
            item.loading = true
            item.pagination++
            this.searchQuery.offset = item.pagination * 30
            const { data: res } = await Search(this.searchQuery)
            if (res.code !== 200) {
              this.$notify({
                type: 'danger',
                message: '获取搜索结果失败'
              })
            } else {
              this.resultList[item.name] = this.resultList[item.name].concat(res.result[item.name])
              item.loading = false
              item.hasMore = res.result.hasMore
            }
          } else {
            item.loading = false
            item.finished = true
          }
        } else {

        }
      })
    },
    switchTab () {
      // 如果数据请求过 不需重新请求
      const typeArr = this.typeList.filter(item => { return item.type === parseInt(this.active) })
      if (this.resultList[typeArr[0].name]) {
      } else {
        this.getSearch()
      }
    }
  },
  created () {
    this.searchQuery.keywords = this.$route.query.keywords
    this.title = `"${this.searchQuery.keywords}"的查询结果`
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.van-ellipsis{
  font-size: .33rem;
}
.describe{
  color: #909399;
  font-size: .28rem;
  .artists{

  }
  .album{

  }
}
</style>
