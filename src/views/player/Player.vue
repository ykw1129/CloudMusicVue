<template>
  <div id="player" :style="{backgroundColor:mainColor}">
    <van-nav-bar :title="currentSong" left-arrow @click-left="back">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(235, 32, 0)" />
      </template>
      <template #right>
        <van-icon name="share-o" size="18" color="rgb(235, 32, 0)" />
      </template>
    </van-nav-bar>
    <div class="songmsg">
      <h5 :style="{color:fontColor}">{{currentSong}}</h5>
      <p
        :style="{color:fontColor}"
      >{{currentSongAlbum?currentSongAlbum:'未知专辑'}} - {{currentSongAuthor}}</p>
    </div>
    <div class="songimg">
      <van-loading color="#C0C4CC" type="spinner" size="4rem" v-if="!currentSongImgUrl" />
      <img :src="currentSongImgUrl+'?param=400y400'" alt v-else />
    </div>
    <div class="player">
      <audio-player
        :audio-list="audioList"
        ref="AudioComponent"
        style="margin:0.5rem 0"
        :before-next="beforePlayNext"
        :before-prev="beforePlayPrev"
        :before-play="playBefore"
      />
    </div>
    <div class="songoperation">
      <div class="item">
        <van-icon
          :name="like?'like':'like-o'"
          size="0.5rem"
          :color="like?'rgb(235, 32, 0)':fontColor"
          @click="handleLike"
        />
      </div>
      <div class="item">
        <van-icon name="comment-o" size="0.5rem" badge="999+" :color="fontColor"  @click="commentShow = true" />
      </div>
      <div class="item">
        <van-icon name="down" size="0.5rem" :color="fontColor" />
      </div>
      <div class="item">
        <van-icon name="share-o" size="0.5rem" :color="fontColor" />
      </div>
      <div class="item">
        <van-icon name="more-o" size="0.5rem" :color="fontColor" />
      </div>
    </div>
    <van-action-sheet v-model="commentShow"  >
      <template #default>

      </template>
    </van-action-sheet>
  </div>
</template>

<script>
import analyze from 'rgbaster'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { getSongLikeList } from '@/api/song'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import AudioPlayer from '@liripeng/vue-audio-player'
export default {
  data () {
    return {
      commentShow: false,
      currentPlayIndex: '',
      mainColor: '',
      fontColor: '#333',
      like: false
    }
  },
  props: ['id'],
  watch: {
    currentSongUrl: {
      handler (val) {
        if (!val) {
          this.$dialog.alert({ message: '此音乐没有资源，播放下一首' }).then(() => {
            this.$store.commit('FIXPLAYERURLLIST')
            setTimeout(() => {
              this.$refs.AudioComponent.playNext()
            }, 500)
          })
        }
      }
    }
  },
  computed: {
    ...mapState({
      playState: state => state.playList.playState,
      currentSong: state => state.playList.currentSong,
      currentSongImgUrl: state => state.playList.currentSongImgUrl,
      currentSongUrl: state => state.playList.currentSongUrl,
      currentSongAlbum: state => state.playList.currentSongAlbum,
      currentSongAuthor: state => state.playList.currentSongAuthor
    }),
    ...mapMutations([
    ]),
    ...mapGetters({
      audioList: 'getAudioPlayerUrlList'
    }),
    ...mapActions([
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
          setTimeout(() => {
            // this.$refs.AudioComponent.play()
          }, 500)
        } else {
          setTimeout(() => {
            // this.$refs.AudioComponent.pause()
          }, 500)
        }
      })
    },
    back () {
      history.go(-1)
    },
    // 判断audioList是否存在歌曲
    hasAllAudioList () {
      this.$store.commit('GETPLAYLIST')
      if (this.currentSongUrl === null) {
        this.$dialog.alert({ message: '此音乐没有资源，播放下一首' }).then(() => {
          this.$store.commit('FIXPLAYERURLLIST')
          setTimeout(() => {
            this.$refs.AudioComponent.playNext()
          }, 500)
        })
      }
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
    // 点击下一首前的操作
    beforePlayNext (next) {
      next()
    },
    // 点击上一首前的操作
    beforePlayPrev (prev) {
      prev()
    },
    playBefore (play) {
      // 切歌播放前 改变state中当前音乐的一些参数
      this.$store.commit('CHANGESONG', this.$refs.AudioComponent.currentPlayIndex)
      play()
    },
    async getMainColor (url) {
      const res = await analyze(url, {
        ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']
      })

      this.mainColor = res[10].color
      this.rgb = this.getRGB(this.mainColor)
    },
    // 获取rgb数值
    getRGB (str) {
      const match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/)
      const rgb = match ? { red: match[1], green: match[2], blue: match[3] } : null
      this.getIsLight(rgb)
    },
    // 根据亮色暗色更改字体颜色
    getIsLight (color) {
      if (0.213 * color.red + 0.715 * color.green + 0.072 * color.red > 255 / 2) {
        this.fontColor = '#333'
      } else {
        this.fontColor = '#fff'
      }
    },
    // TODO: 点击喜欢 API报错
    async handleLike () {
      this.like = !this.like
      this.$notify({ type: 'warning', message: '该功能正在开发中' })
      /*       try {
        const { data: res } = await getSongLike({ id: this.$route.params.id, like: !this.like })
        console.log(res)
        if (res.code !== 200) {
          this.$notify({ type: 'warning', message: '歌曲操作失败,请稍后再试' })
        } else {
          this.like = !this.like
          if (this.like) {
            this.$notify({ type: 'success', message: '❤喜欢成功！' })
          } else {
            this.$notify({ type: 'success', message: '❤取消喜欢成功！' })
          }
        }
      } catch {

      } */
    },
    // 判断是否是喜欢的歌曲
    async getLikeSongList () {
      const { data: res } = await getSongLikeList(this.$route.params.id)
      if (res.code !== 200) {
        this.$notify({ type: 'warning', message: '获取歌曲状态失败,请稍后再试' })
      } else {
        this.like = res.ids.indexOf(this.$route.params.id) !== -1
      }
    }
  },
  created () {
  },
  mounted () {
    this.hasAllAudioList()
    this.getPlayState()
    this.getMainColor(this.currentSongImgUrl)
    this.getLikeSongList()
  },
  beforeDestroy () {
    this.$store.commit('STOPPLAYER')
  }
}
</script>

<style lang="less" scoped>
#player{
  height: 100vh;
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
        width: 4rem;
        height: 4rem;
  }

}
.songmsg{
  h5{
    text-align: center;
    font-size: .5rem;
    margin: .2rem 0;
  }
  p{
    text-align: center;
    font-size: .4rem;
    margin: .5rem 0;
  }
}
.songoperation{
  margin-top: auto;
  display: flex;
  justify-content: space-around;
  .item{
  }
}
.player{
  padding: .1rem .4rem;
  /deep/ .audio-player .audio__play-volume-icon-wrap{
  top: 0;
}
}
}

</style>
