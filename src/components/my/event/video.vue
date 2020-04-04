<template>
  <div id="video">
    <video
      ref="video"
      :src="videoUrl"
      controls="controls"
      :width="videoWidth"
      :poster="videoPoster"
    >
      您的游览器不支持html5
    </video>

  </div>
</template>

<script>
export default {
  data () {
    return {
      videoWidth: '',
      videoUrl: '',
      videoId: '',
      videoPoster: ''
    }
  },
  props: {
    childId: {
    },
    posterUrl: {
      type: String
    }
  },
  created () {
    this.videoId = this.childId
    this.videoPoster = this.posterUrl
    this.getVideoUrl()
  },
  mounted () {
    this.getVideoInit()
  },
  methods: {
    getVideoInit () {
      this.videoWidth = document.body.clientWidth - 77
      this.$refs.video.volume = 0.1
    },
    async getVideoUrl () {
      const { data: res } = await this.$http.get('/video/url', {
        params: { id: this.videoId }
      })
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取视频失败' })
      }
      this.videoUrl = res.urls[0].url
    }
  }
}
</script>

<style lang="less" scoped>

</style>
