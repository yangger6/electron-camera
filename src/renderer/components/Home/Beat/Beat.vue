<template>
    <div class="beat">
        <div :class="[selectMode.mode, {'delay-square': delay}]" @mousedown="beat(1)" ref="btn"></div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'beat',
    computed: {
      ...mapGetters([
        'selectMode',
        'cameraState'
      ]),
      delayStore () {
        return this.$store.getters.getUtilsByName('delay')
      },
      delay () {
        return this.cameraState === 1 && this.delayStore.time > 0
      }
    },
    methods: {
      beat (state) {
        if ([...this.$refs.btn.classList].find(css => css === 'delay-square')) {
          state = 2
        }
        this.$store.commit('CHANGE_STATE', state)
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "bate.scss";
</style>