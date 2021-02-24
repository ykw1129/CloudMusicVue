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
    <van-tabs type="card" v-model="active" @change="switchTab">
      <van-tab title="单曲" name="1">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
                <p class="describe">
                  <span class="artists">{{}}</span>
                  <span class="album">{{}}</span>
                </p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="专辑" name="10">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="歌手" name="100">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="歌单" name="1000">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="用户" name="1002">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="MV" name="1004">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="歌词" name="1006">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="电台" name="1009">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="视频" name="1014">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
              <template v-slot:default>
                <p class="van-ellipsis">{{item.name}}</p>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="综合" name="1018">
        <van-pull-refresh v-model="refreshing" @refresh="switchTab">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadSearch">
            <van-cell v-for="item in resultList" :key="item.id">
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
      resultList: [],
      albumName: '',
      refreshing: false,
      loading: false,
      finished: false,
      hasMore: false,
      pagination: 0
    }
  },
  methods: {
    //  页面后退
    back () {
      history.go(-1)
    },
    // 获取搜索结果
    async getSearch (data) {
      this.pagination = 0
      this.searchQuery.offset = 0
      this.searchQuery.type = this.active
      this.loading = true
      const { data: res } = await Search(data)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取搜索结果失败' })
        this.loading = false
        this.finished = true
      } else {
        this.loading = false
        console.log(res.result)
        switch (parseInt(this.active)) {
          case 1:this.resultList = res.result.songs
            break
          case 10:this.resultList = res.result.albums
            break
          case 100:this.resultList = res.result.artists
            break
          case 1000:this.resultList = res.result.playlists
            break
          case 1002:this.resultList = res.result.userprofiles
            break
          case 1004:this.resultList = res.result.mvs
            break
          case 1006:this.resultList = res.result.songs
            break
          case 1009:this.resultList = res.result.djRadios
            break
          case 1014:this.resultList = res.result.videos
            break
          case 1018:this.resultList = res.result.albums
            break
          default:this.resultList = res.result.songs
            break
        }
        this.hasMore = res.result.hasMore || false
      }
    },
    async loadSearch () {
      console.log(this.hasMore)
      if (this.hasMore) {
        this.loading = true
        this.pagination++
        this.searchQuery.offset = this.pagination * 30
        const { data: res } = await Search(this.searchQuery)
        if (res.code !== 200) {
          this.$notify({ type: 'danger', message: '获取搜索结果失败' })
          this.loading = false
        } else {
          switch (parseInt(this.active)) {
            case 1:this.resultList = this.resultList.concat(res.result.songs)
              break
            case 10:this.resultList = this.resultList.concat(res.result.albums)
              break
            case 100:this.resultList = this.resultList.concat(res.result.artists)
              break
            case 1000:this.resultList = this.resultList.concat(res.result.playlists)
              break
            case 1002:this.resultList = this.resultList.concat(res.result.userprofiles)
              break
            case 1004:this.resultList = this.resultList.concat(res.result.mvs)
              break
            case 1006:this.resultList = this.resultList.concat(res.result.songs)
              break
            case 1009:this.resultList = this.resultList.concat(res.result.djRadios)
              break
            case 1014:this.resultList = this.resultList.concat(res.result.videos)
              break
            case 1018:this.resultList = this.resultList.concat(res.result.albums)
              break
            default:this.resultList = this.resultList.concat(res.result.songs)
              break
          }
          this.loading = false
          console.log(res.result)
          this.hasMore = res.result.hasMore || false
        }
      } else {
        this.finished = true
      }
    },
    switchTab () {
      this.finished = false
      this.getSearch(this.searchQuery)
    }
  },
  created () {
    this.searchQuery.keywords = this.$route.query.keywords
    this.title = `"${this.searchQuery.keywords}"的查询结果`
  },
  mounted () {
    this.getSearch(this.searchQuery)
  }
}
</script>

<style>

</style>
