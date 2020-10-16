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
           <img :src="playList.currentSongImgUrl" alt="">
        </div>
        <AudioPlayer :audio-list="audioList" ref="AudioComponent" :before-next="beforePlayNext" :before-prev="beforePlayPrev" :before-play="playBefore"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '@liripeng/vue-audio-player'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      isPlaying: '',
      currentPlayIndex: '',
      currentSongInfo: {}
    }
  },
  watch: {
    currentSongUrl: function (val, oldval) {
      if (val === null) {
        // 若列表中没有歌曲，返回上一页面
        Dialog.alert({ message: '抱歉！此歌曲暂时无资源。' }).then(() => {
          if (this.audioList.length === 1) {
            history.go(-1)
          } else {
            this.$refs.AudioComponent.playNext()
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
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
        if (this.playList.playState) {
          this.$refs.AudioComponent.play()
        } else {
          this.$refs.AudioComponent.pause()
        }
      })
    },
    back () {
      this.$delete(this.$refs.AudioComponent.playing, 'currentTime')
      history.go(-1)
    },
    titleRun () {

    },
    hasAudioList () {
      const isAllNull = this.audioList.some((url) => {
        return url != null
      })
      if (!isAllNull) {
        // 若列表中没有歌曲，返回上一页面
        this.$dialog.alert({ message: '播放列表中没有歌曲！' }).then(() => {
          history.go(-1)
        })
      } else {
        if (this.audioList[this.currentPlayIndex] === null) {
          this.$dialog.alert({ message: '此音乐没有资源，播放下一首' }).then(() => {
            this.$refs.AudioComponent.playNext()
          })
        }
      }
    },
    beforePlayNext (next) {
      next()
    },
    beforePlayPrev (prev) {
      prev()
    },
    playBefore (play) {
      this.currentPlayIndex = this.$refs.AudioComponent.currentPlayIndex
      this.$store.commit('CHANGESONG', this.currentPlayIndex)
      this.hasAudioList()
      play()
    }

  },
  created () {

  },
  mounted () {
    this.getPlayState()
    this.currentPlayIndex = this.$refs.AudioComponent.currentPlayIndex
    console.log(this.$refs.AudioComponent)
  }
}
</script>

<style lang="less" scoped>
.songimg{
  width: 100%;
  text-align: center;
  img{
    width: 200px;
    height: 200px;
    border-radius: 15px;
  }
}
</style>
