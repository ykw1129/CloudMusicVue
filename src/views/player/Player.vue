<template>
    <div id="Player">
          <van-nav-bar
      :title="playList.currentSong"
      left-arrow
      @click-left="back"
    >
      <template #left>
          <van-icon
            name="arrow-left"
            size="18"
            color="rgb(235, 32, 0)"
          />
      </template>
      <template #right>
        <van-icon
          name="share-o"
          size="18"
          color="rgb(235, 32, 0)"
        />
      </template>
    </van-nav-bar>
            <div class="songimg">
            <van-skeleton avatar avatar-size="200px" avatar-shape="square" :loading="loading">
           <img :src="currentSongImgUrl" alt="">
            </van-skeleton>
            </div>
        <AudioPlayer :audio-list="audioList" ref="AudioComponent" :before-next="beforePlayNext" :before-prev="beforePlayPrev" :before-play="playBefore"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '@liripeng/vue-audio-player'
export default {
  data () {
    return {
      loading: true,
      currentPlayIndex: ''
    }
  },
  watch: {
    currentSongUrl: {
      handler (val) {
        if (!val) {
          this.$dialog.alert({ message: '此音乐没有资源，播放下一首' }).then(() => {
            this.$refs.AudioComponent.playNext()
          })
        }
      },
      immediate: true
    },
    currentSongImgUrl: {
      handler (val) {

      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      playState: state => state.playList.playState,
      currentSongImgUrl: state => state.playList.currentSongImgUrl,
      currentSongUrl: state => state.playList.currentSongUrl,
      playList: state => state.playList
    }),
    ...mapMutations([
      'PLAYSWITCH'
    ]),
    ...mapGetters({
      audioList: 'getAudioPlayerUrlList'
    }),
    ...mapActions([
      'getUserInfo',
      'getIsLogin',
      'getPlayList'
    ])
  },
  components: {
    AudioPlayer
  },
  methods: {
    getPlayState () {
      this.$nextTick(() => {
        if (this.playState) {
          this.$refs.AudioComponent.play()
        } else {
          this.$refs.AudioComponent.pause()
        }
      })
    },
    back () {
      history.go(-1)
    },
    titleRun () {

    },
    // 判断audioList是否存在歌曲
    hasAllAudioList () {
      console.log(this.audioList)
      const isAllNull = this.audioList.some((url) => {
        return url != null
      })
      if (!isAllNull) {
        // 若列表中没有歌曲，返回上一页面
        this.$dialog.alert({ message: '播放列表中没有歌曲！' }).then(() => {
          history.go(-1)
        })
      }
    },
    beforePlayNext (next) {
      this.$refs.AudioComponent.pause()
      next()
    },
    beforePlayPrev (prev) {
      this.$refs.AudioComponent.pause()
      prev()
    },
    playBefore (play) {
      // 切歌播放前 改变state中当前音乐的一些参数
      this.$store.commit('CHANGESONG', this.$refs.AudioComponent.currentPlayIndex)
      play()
    }

  },
  created () {

  },
  mounted () {
    this.getPlayState()
    this.loading = false
    this.hasAllAudioList()
  }
}
</script>

<style lang="less" scoped>
.songimg{
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  .van-skeleton__avatar{
    margin: auto;
    margin-right: 0;
    border-radius: 15px;
    overflow: hidden;

  }
        img{
            border-radius: 15px;
        width: 200px;
        height: 200px;
  }

}
</style>
