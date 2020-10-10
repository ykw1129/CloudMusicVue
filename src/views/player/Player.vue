<template>
    <div>
        <AudioPlayer :audio-list="audioList"/>
    </div>
</template>

<script>
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
    this.getSongUrl()
  }
}
</script>

<style>

</style>
