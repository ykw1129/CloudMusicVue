<template>
    <div>
        <AudioPlayer :audio-list="audioList"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '@liripeng/vue-audio-player'
export default {
  data () {
    return {
      currentMusicUrl: '',
      audioList: [

      ]
    }
  },
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  components: {
    AudioPlayer
  },
  methods: {
    //  获取音乐url
    async getSongUrl () {
      const { data: res } = await this.$http.get('/song/url', {
        params: { id: location.hash.substr(9) }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取歌曲资源失败' })
      }
      this.currentMusicUrl = res.data[0].url
      this.audioList.push(res.data[0].url)
    }
  },
  created () {
    // this.audioList = this.$store
    this.getSongUrl()
  }
}
</script>

<style>

</style>
