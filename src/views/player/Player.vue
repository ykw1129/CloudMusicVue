<template>
    <div>
        <AudioPlayer :audio-list="audioList"/>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import { AudioPlayer } from '@liripeng/vue-audio-player'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      audioList: state => state.playList.list
    }),
    ...mapGetters([

    ])
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
