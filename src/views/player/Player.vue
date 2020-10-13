<template>
    <div>

        <AudioPlayer :audio-list="audioList" ref="AudioComponent" />
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '@liripeng/vue-audio-player'

export default {
  data () {
    return {

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
    })
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
    }
  },
  mounted () {
    this.getPlayState()
  }
}
</script>

<style>

</style>
