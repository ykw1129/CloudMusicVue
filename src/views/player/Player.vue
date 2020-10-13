<template>
    <div>
        <AudioPlayer :audio-list="audioList"/>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '@liripeng/vue-audio-player'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapMutations({

    }),
    ...mapGetters({
      audioList: 'getAudioPlayerUrlList'
    })
  },
  components: {
    AudioPlayer
  },
  methods: {
    getAudioList () {

    }
  },
  created () {

  }
}
</script>

<style>

</style>
