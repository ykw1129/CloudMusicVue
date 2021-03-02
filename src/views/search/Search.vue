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
                <div class="songs" @click="toPlayPage(item.id)">
                  <p class="van-ellipsis">{{item.name}}</p>
                  <p class="describe">
                    <span class="artist">{{item.artists|getArtists}}</span>
                    -
                    <span class="album">{{item.album.name}}</span>
                  </p>
                </div>
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
                <div class="albums">
                  <div class="img">
                    <img :src="item.picUrl+'?param=50y50'" :alt="item.name" />
                  </div>
                  <div class="describe">
                    <h5>{{item.name}}</h5>
                    <p>{{item.artists|getArtists}}</p>
                    <p>
                      发行时间:
                      <span>{{item.publishTime|dateFormat}}</span>
                    </p>
                  </div>
                </div>
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
                <div class="artists">
                  <div class="img">
                    <img
                      :src="item.picUrl?item.picUrl+'?param=150y150':noSingerImg"
                      :alt="item.name"
                    />
                  </div>
                  <h5>{{item.name}}</h5>
                </div>
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
                <div class="playlists">
                  <div class="img">
                    <img :src="item.coverImgUrl+'?param=50y50'" :alt="item.name" />
                  </div>
                  <div class="describe">
                    <h5>{{item.name}}</h5>
                    <p>by {{item.creator.nickname}}</p>
                    <p>
                      <span>{{item.bookCount}}首</span> ,被播放过
                      <span>{{item.playCount}}</span>次
                    </p>
                  </div>
                </div>
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
                <div class="userprofiles">
                  <div class="img">
                    <img
                      :src="item.avatarUrl?item.avatarUrl+'?param=100y100':noSingerImg"
                      :alt="item.nickname"
                    />
                  </div>
                  <div class="describe">
                    <h5>{{item.nickname}}</h5>
                    <p>{{item.signature}}</p>
                  </div>
                  <van-button
                    color="rgb(235, 32, 0)"
                    plain
                    round
                    icon="plus"
                    type="info"
                    size="small"
                  >关注</van-button>
                </div>
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
                <div class="mvs">
                  <div class="img">
                    <img :src="item.cover" :alt="item.name" />
                  </div>
                  <h5>{{item.name}}</h5>
                </div>
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
                <div class="lyric">
                  <p class="van-ellipsis">{{item.name}}</p>
                  <p class="describe">
                    <span class="artist">{{item.artists|getArtists}}</span>
                    -
                    <span class="album">{{item.album.name}}</span>
                  </p>
                </div>
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
                <div class="djRadios">
                  <div class="img">
                    <img :src="item.picUrl+'?param=50y50'" :alt="item.name" />
                  </div>
                  <div class="describe">
                    <h5>{{item.name}}</h5>
                    <p>{{item.dj.signature}}</p>
                    <p>
                      by
                      <span>{{item.dj.nickname}}</span>
                    </p>
                  </div>
                  <div class="avatar">
                    <img :src="item.dj.avatarUrl" :alt="item.dj.nickname" />
                  </div>
                </div>
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
                <div class="videos">
                  <div class="img">
                    <img :src="item.coverUrl" :alt="item.name" />
                  </div>
                  <h5>{{item.title}}</h5>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getSongDetail, getSongUrl } from '@/api/song'
import { Search } from '../../api/search'
export default {
  data () {
    return {
      noSingerImg: require('../../assets/image/singer.jpg'),
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
      refreshing: false,
      songMsg: {}
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
          // 因为finished为false时会自动调用loadSearch方法
          this.searchQuery.offset = 0
          this.searchQuery.type = this.active
          const { data: res } = await Search(this.searchQuery)
          if (res.code !== 200) {
            this.$notify({ type: 'danger', message: '获取搜索结果失败' })
            item.loading = false
          } else {
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
        }
      })
    },
    switchTab () {
      // 如果数据请求过 不需重新请求
      const typeArr = this.typeList.filter(item => { return item.type === parseInt(this.active) })
      if (this.resultList[typeArr[0].name]) {
        return null
      } else {
        this.getSearch()
      }
    },
    toPlayPage (id) {
      this.getSongUrlPlayer(id)
    },
    // 获取音乐信息 ，dispatch到vuex里
    async getSongMsg (id) {
      const { data: res } = await getSongDetail(id)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取' + id + '歌曲失败' })
      }
      console.log(res.songs[0].al.name)
      this.songMsg = {
        album: res.songs[0].al.name,
        songName: res.songs[0].name,
        des: res.songs[0].alia[0] ? '(' + res.songs[0].alia[0] + ')' : null,
        songAuthor: res.songs[0].ar.map((item) => { return item.name }).join('/'),
        songImgUrl: res.songs[0].al.picUrl
      }
    },
    // 获取歌曲url
    async getSongUrlPlayer (id) {
      this.getSongMsg(id)
      const { data: res } = await getSongUrl(id)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲失败' })
      }
      this.songMsg.songUrl = res.data[0].url
      const song = {
        songId: id,
        songImgUrl: this.songMsg.songImgUrl,
        songName: this.songMsg.songName,
        songAuthor: this.songMsg.songAuthor,
        songUrl: this.songMsg.songUrl,
        songAlbum: this.songMsg.album
      }
      this.$store.dispatch('toPlayList', song)
      this.$router.push({ name: 'Player' })
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
/deep/ .van-cell{
  line-height:2;
}
/deep/ .van-tabs__wrap--scrollable .van-tabs__nav--complete{
  padding: 0;
}
.songs{
  .van-ellipsis{
    font-size: .33rem;
  }
  .describe{
    color: #909399;
    font-size: .28rem;
    .artist{

    }
    .album{

    }
  }
}
.albums{
  display: flex;
  flex-flow: row nowrap;
  .img{
      display: flex;
      justify-content: center;
      align-items: center;
    img{
      width: 1rem;
      height: 1rem;
    }
  }
  .describe{
    padding-left: .2rem;
    flex-grow: 1;
    justify-content: center;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    h5{
      font-size: .3rem;
    }
    p{
      color: #909399;
      &:nth-child(2){
      font-size: .23rem;
      }
      &:nth-child(3){
      font-size: .20rem;
      span{
        color: #add8e6;
      }
      }
    }
  }
}
.artists{
  display: flex;
  .img{
      display: flex;
      justify-content: center;
      align-items: center;
    img{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
  }
    h5{
      align-items: center;
        padding-left: .2rem;
        flex-grow: 1;
        justify-content: center;
        display: flex;
        font-size: .3rem;
    }
}
.playlists{
  display: flex;
  flex-flow: row nowrap;
  .img{
      display: flex;
      justify-content: center;
      align-items: center;
    img{
      border-radius: 5px;
      width: 1rem;
      height: 1rem;
    }
  }
  .describe{
    padding-left: .2rem;
    flex-grow: 1;
    justify-content: center;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    h5{
      font-size: .3rem;
    }
    p{
      color: #909399;
      &:nth-child(2){
      font-size: .23rem;
      }
      &:nth-child(3){
      font-size: .20rem;
      span{
        color: #add8e6;
      }
      }
    }
  }
}
.userprofiles{
  align-items: center;
    display: flex;
  .img{
      display: flex;
      justify-content: center;
      align-items: center;
    img{
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
  }
  .describe{
        padding-left: .4rem;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-around;
        display: flex;
    h5{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
        font-size: .3rem;
    }
    p{
      width: 5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
 font-size: .25rem;
 color: #909399;
    }
  }
}
.mvs{
  width: 100%;
  .img{
    width: 100%;
    img{
      width: 100%;
      border-radius: 5px;
    }
  }
  h5{
    font-size: .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.lyric{
    .van-ellipsis{
    font-size: .33rem;
  }
  .describe{
    color: #909399;
    font-size: .28rem;
    .artist{

    }
    .album{

    }
  }
}
.djRadios{
    display: flex;
  flex-flow: row nowrap;
  .img{
      display: flex;
      justify-content: center;
      align-items: center;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 5px;
    }
  }
  .describe{
    padding-left: .2rem;
    flex-grow: 1;
    justify-content: center;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    h5{
      width: 6.5rem;
      font-size: .3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p{
            width: 6.5rem;
      color: #909399;
      font-size: .25rem;
            overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span{
        color: #add8e6;
      }
    }
  }
  .avatar{
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
}
.videos{
  width: 100%;
  .img{
    width: 100%;
    img{
      width: 100%;
      border-radius: 5px;
    }
  }
  h5{
    font-size: .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
