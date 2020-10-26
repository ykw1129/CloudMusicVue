<template>
  <div id="mv">
          <video
      ref="video"
      :src="mvUrl"
      controls="controls"
      :width="mvWidth"
      :poster="mvPoster"

    >
      您的游览器不支持html5
    </video>
  </div>
</template>

<script>
import { getMvUrl } from '@/api/mv'
export default {
  data () {
    return {
      mvId: '',
      mvPoster: '',
      mvWidth: '',
      mvUrl: ''
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
    this.mvId = this.childId
    this.mvPoster = this.posterUrl
    this.getMvUrl()
  },
  mounted () {
    this.getMvInit()
  },
  methods: {
    getMvInit () {
      this.mvWidth = document.body.clientWidth - 77
      this.$refs.video.volume = 0.1
    },
    async getMvUrl () {
      const { data: res } = await getMvUrl(this.mvId)
      if (res.code !== 200) {
        this.$notify({ type: 'danger', message: '获取mv地址失败' })
      }
      this.mvUrl = res.data.url
    }
  }

}
</script>

<style lang="less" scoped>

</style>
