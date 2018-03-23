<template>
  <main ref="main">
    <video ref="video">Video stream not available.</video>
  </main>
</template>
<script>
  export default {
    name: '',
    components: { },
    data () {
      return {
        streaming: false
      }
    },
    mounted () {
      let video = this.$refs.video
      let streaming = this.streaming
      video.height = this.$refs.main.clientHeight
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream
          video.play()
        })
        .catch(function (err) {
          console.log('An error occured!' + err)
        })
      video.addEventListener('canplay', function (ev) {
        if (!streaming) {
          video.style.left = `-${(video.videoWidth - window.innerWidth) / 2}px`
          streaming = true
        }
      }, false)
    },
    methods: {
    }
  }
</script>
<style scoped lang="scss">
  video{
    position: absolute;
  }
</style>
