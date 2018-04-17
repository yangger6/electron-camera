<template>
    <span class="delay">
        <h2 class="" ref="delay">
        </h2>
    </span>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'tip',
    data () {
      return {
        delayJSQ: setInterval
      }
    },
    computed: {
      ...mapGetters([
        'cameraState'
      ]),
      delayTime () {
        return this.$store.getters.getUtilsByName('delay').time
      }
    },
    watch: {
      cameraState (val) {
        let p = this.$refs.delay
        clearInterval(this.delayJSQ)
        p.innerHTML = ''
        if (val === 0) return
        let time = this.delayTime
        if (time) { // 关闭为0
          p.innerHTML = time
          this.delayJSQ = setInterval(() => {
            time--
            p.innerHTML = time
            if (time === 0) {
              p.innerHTML = ''
              clearInterval(this.delayJSQ)
            }
          }, 1000)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    span{
        position: absolute;
        &.delay{
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            h2{
                font-size: 5rem;
                color: #fff;
                opacity: 1;
                transition: opacity 1s ease;
                &.remove{
                    opacity: 0;
                }
            }
        }
    }
</style>