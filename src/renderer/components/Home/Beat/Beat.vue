<template>
    <div class="beat">
        <div :class="[selectMode.mode, {'delay-square': delay}]" @mousedown="holdOn" @mouseup="beat(1)" ref="btn"></div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'beat',
    data () {
      return {
        hold: false,
        setint: setInterval
      }
    },
    computed: {
      ...mapGetters([
        'selectMode',
        'cameraState',
        'burstData'
      ]),
      delayStore () {
        return this.$store.getters.getUtilsByName('delay')
      },
      delay () {
        return this.cameraState === 1 && this.delayStore.time > 0
      }
    },
    methods: {
      holdOn () {
        this.setint = setInterval(() => {
          this.$store.commit('CHANGE_STATE', 3)
        }, 100)
      },
      beat (state) {
        if (this.burstData.num) { // 已经连拍了
          this.claerJSQ()
          this.$store.commit('CLEAR_BURSTDATA') // 清除连拍记录
          this.$store.commit('CHANGE_STATE', 0) // 清除相机状态
          return
        }
        if ([...this.$refs.btn.classList].find(css => css === 'delay-square')) {
          state = 2
        }
        this.$store.commit('CHANGE_STATE', state)
      },
      claerJSQ () {
        clearInterval(this.setint) // 清除长按计时器
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "bate.scss";
</style>