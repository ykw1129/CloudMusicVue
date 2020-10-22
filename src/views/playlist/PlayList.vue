<template>
  <div id="playlist" :style="{backgroundColor:mainColor}">
    <van-nav-bar title="歌单" left-text="返回" left-arrow @click-left="back">
        <template #left>
    <van-icon name="arrow-left" size="0.5rem" color="#333" />
  </template>
  <template #right>
    <van-icon name="search" size="0.5rem"  color="#333"/>
  </template>
</van-nav-bar>
  <div class="detail">
    <div class="left">
      <img :src="playlistCoverImg" :alt="playlistName">
    </div>
    <div class="right">
        <div class="name">{{playlistName}}</div>
        <div class="creator">
          <img :src="playlistCreatorAvatar" :alt="playlistName">
          <span>{{playlistCreatorName}} <van-icon name="arrow" /> </span>
        </div>
        <div class="editmsg">编辑信息<van-icon name="arrow" /></div>
    </div>

  </div>
<div class="operation">
  <div class="item">
    <van-icon name="comment-o" size="0.5rem" />
    <span>评论</span>
  </div>
  <div class="item">
    <van-icon name="share-o" size="0.5rem"/>
    <span>分享</span>
  </div>
  <div class="item">
    <van-icon name="down" size="0.5rem"/>
    <span>下载</span>
  </div>
  <div class="item">
    <van-icon name="add-o" size="0.5rem"/>
    <span>多选</span>
  </div>
</div>
<div class="list">
<van-pull-refresh v-model="refreshing">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
  >
              <template v-slot:default>
                <playlistItem v-for="(privilege,index) in privileges" :key="privilege.id" :songId="privilege.id" :index="index"/>;
              </template>
  </van-list>
</van-pull-refresh>
</div>
  </div>
</template>

<script>
import playlistItem from '../../components/playlist/playlistItem'
import analyze from 'rgbaster'
export default {
  data () {
    return {
      finished: false,
      loading: false,
      refreshing: false,
      playlistId: '',
      mainColor: '#DCDCDC',
      playlistCoverImg: '',
      playlistCreatorName: '',
      playlistCreatorAvatar: '',
      playlistName: '',
      playlistDescription: '',
      playlistTags: [],
      privileges: []
    }
  },
  components: {
    playlistItem
  },
  methods: {
    async getPlayList () {
      const { data: res } = await this.$http.get('/playlist/detail', { params: { id: window.location.hash.substr(11) } })
      if (res.code !== 200) return this.$notify({ type: 'danger', message: '获取歌单失败！' })
      this.playlistCoverImg = res.playlist.coverImgUrl
      this.playlistCreatorName = res.playlist.creator.signature
      this.playlistName = res.playlist.name
      this.playlistDescription = res.playlist.description
      this.playlistTags = res.playlist.tags
      this.playlistCreatorAvatar = res.playlist.creator.avatarUrl
      this.getMainColor(res.playlist.coverImgUrl)
      this.privileges = res.privileges
      this.finished = true
      this.loading = true
    },
    back () {
      history.go(-1)
    },
    // 选择主色号
    async getMainColor (url) {
      const res = await analyze(url, {
        ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'],
        scale: 0.6
      })
      this.mainColor = res[10].color
    }
  },
  created () {
    this.getPlayList()
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
#playlist{
  transition: all 0.5s;
  /deep/ .van-nav-bar__title{
    color: #333;
  }
  /deep/ .van-nav-bar{
    background-color: transparent;
  }
  .detail{
    display: flex;
    justify-content: space-around;
    padding: 0.4rem 0.4rem;
    .left{
      width: 3rem;
    img{
      width: 100%;
      height: 3rem;
    }
    }
    .right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 4rem;
      .name{
        font-size: 0.45rem;
      }
      .creator{
        display: flex;
        align-items: center;
        img{
          width: 0.8rem;
          height:0.8rem;
          margin-right: 0.15rem;
          border-radius: 50%;
        }
        span{
          font-size: 0.3rem;
          /deep/ .van-icon{
            vertical-align: middle;
          }
        }
      }
      .editmsg{
          /deep/ .van-icon{
            vertical-align: middle;
          }
        font-size: 0.3rem;
      }
    }

  }
  .operation{
    margin: 0.2rem 0;
    padding: 0 1rem;
    display: flex;
    justify-content: space-around;
    .item{
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      span{
        padding: 0.15rem 0;
        font-size: 0.3rem;
      }
    }
  }
  .list{
    background: #F5F5F5;
    border-radius: 10px 10px 0 0;
  }
}
</style>
