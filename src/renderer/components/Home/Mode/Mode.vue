<template>
    <div class="mode">
        <div class="masked">
            <ul :style="{left: modeLeft}" :data-index="modeIndex" ref="modeBar" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
                <li :class="{selected: index === modeIndex }" v-for="(mode, index) in modes">
                    <span>{{mode.text}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'mode',
    data () {
      return {
        isTap: false,
        oldX: 0
      }
    },
    computed: {
      modeLeft () {
        return `-${(window.innerWidth / 6) * this.modeIndex}px`
      },
      ...mapState({
        modes: state => state.Mode.modes,
        modeIndex: state => state.Mode.index
      })
    },
    methods: {
      mousedown (e) {
        this.isTap = true
        this.oldX = e.clientX
      },
      mousemove (e) {
        if (!this.isTap) return
        let moveLength = e.clientX - this.oldX
        if (moveLength > 20) {
          let index = this.$refs.modeBar.dataset.index
          if (index > 0) {
            this.oldX = e.clientX
            this.$store.commit('CHANGE_MODE', --index)
          }
          this.isTap = false
        } else if (Math.abs(moveLength) > 20) {
          let index = this.$refs.modeBar.dataset.index
          if (index < 5) {
            this.oldX = e.clientX
            this.$store.commit('CHANGE_MODE', ++index)
          }
          this.isTap = false
        }
      },
      mouseup () {
        this.isTap = false
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "Mode.scss";
</style>