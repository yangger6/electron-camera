<template>
  <main ref="main">
    <figure style="width: inherit;height: inherit" :class="filter">
      <video ref="video" id="video">Video stream not available.</video>
    </figure>
    <canvas ref="canvas" id="canvas">canvas</canvas>
  </main>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'screenByVedio',
    data () {
      return {
        delayJSQ: setTimeout,
        streaming: false
      }
    },
    computed: {
      ...mapGetters([
        'cameraState'
      ]),
      delayTime () {
        return this.$store.getters.getUtilsByName('delay').time
      },
      filter () {
        let storeFilter = this.$store.getters.getUtilsByName('filter')
        return storeFilter.filters[storeFilter.selectIndex]
      }
    },
    mounted () {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      let streaming = this.streaming
      navigator.mediaDevices.getUserMedia({ video: {width: document.body.offsetWidth, height: document.body.offsetHeight}, audio: false })
        .then(function (stream) {
          video.srcObject = stream
          video.play()
        })
        .catch(function (err) {
          console.log('An error occured!' + err)
        })
      video.addEventListener('canplay', function (ev) {
        if (!streaming) {
          canvas.width = video.offsetWidth
          canvas.height = video.offsetHeight
          streaming = true
        }
      }, false)
    },
    methods: {
      async snapshot () {
        let canvas = this.$refs.canvas
        let video = this.$refs.video
        let ctx = canvas.getContext('2d')
        if (!this.streaming) {
          let dx = video.style.left.replace(/-|px/g, '')
          let dy = document.querySelector('header').offsetHeight
          let w = document.body.offsetWidth
          let y = video.offsetHeight - document.querySelector('header').offsetHeight - document.querySelector('footer').offsetHeight
          canvas.height = y // 图片实际高度
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          if (this.filter) {
            ctx.filter = window.getComputedStyle(video.parentElement, null).getPropertyValue('filter')
          }
          ctx.drawImage(video, dx, dy, w, y, 0, 0, w, y)
          let formData = new FormData()
          formData.append(this.$cfg.upload.fileKey, canvas.toDataURL('image/png'))
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          await this.$http.post(this.$cfg.upload.path, formData, config)
          this.$store.commit('CHANGE_IMGDATAURL', canvas.toDataURL('image/png'))
        }
      }
    },
    watch: {
      cameraState (val) {
        if (val === 1) { // 拍照
          if (this.delayTime) { // 开启了计时器
            this.delayJSQ = setTimeout(() => {
              this.snapshot()
              this.$store.commit('CHANGE_STATE', 0)
            }, 1000 * this.delayTime)
          } else {
            this.snapshot()
            this.$store.commit('CHANGE_STATE', 0)
          }
        } else if (val === 2) {
          clearTimeout(this.delayJSQ)
          this.$store.commit('CHANGE_STATE', 0)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  video{
    position: absolute;
  }
</style>
