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
      <lazy-component>
        <div class="songimg">
           <img :src="playList.currentSongImgUrl" alt="">
        </div>
      </lazy-component>
        <AudioPlayer :audio-list="audioList" ref="AudioComponent" :before-next="playNext" :before-prev="playPrev" :before-play="playBefore"/>
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
      currentPlayIndex: '',
      currentSongInfo: {}
    }
  },
  watch: {
    audioList: function (val, oldval) {
      if (val.length === 0) {
        // 若列表中没有歌曲，返回上一页面
        Dialog.alert({ message: '播放列表中没有歌曲！' }).then(() => {
          history.go(-1)
        })
      }
    }
  },
  computed: {
    ...mapState({
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
      history.go(-1)
    },
    titleRun () {

    },
    hasAudioList (val) {
      if (val.length === 0) {
        // 若列表中没有歌曲，返回上一页面
        this.dialog.alert({ message: '播放列表中没有歌曲！' }).then(() => {
          history.go(-1)
        })
      }
      if (val[this.currentPlayIndex] === null) {
        this.dialog.alert({ message: '此音乐没有资源，播放下一首' }).then(() => {
          this.$refs.AudioComponent.playNext()
        })
      }
    },
    playNext (next) {
      next()
    },
    playPrev (prev) {
      prev()
    },
    playBefore (play) {
      this.currentPlayIndex = this.$refs.AudioComponent.currentPlayIndex
      this.$store.commit('CHANGESONG', this.currentPlayIndex)
      play()
    }

  },
  created () {

  },
  mounted () {
    this.getPlayState()
    this.currentPlayIndex = this.$refs.AudioComponent.currentPlayIndex
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
  }
}
</style>
