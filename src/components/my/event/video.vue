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
import { getVideoUrl } from '@/api/video'
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
    this.getVideo()
  },
  mounted () {
    this.getVideoInit()
  },
  methods: {
    getVideoInit () {
      this.$refs.video.volume = 0.5
    },
    async getVideo () {
      const { data: res } = await getVideoUrl(this.videoId)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取视频失败' })
      }
      this.videoUrl = res.urls[0].url
    }
  }
}
</script>

<style lang="less" scoped>
#video{
  video{
    width: 100%;
    border-radius: 15px;
  }
}
</style>
