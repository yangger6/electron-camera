<template>
    <div class="mode">
        <div class="masked">
            <ul :style="{left: modeLeft}">
                <li :class="{selected: index === modeIndex }" v-for="(mode, index) in modes">
                    <span>{{mode}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'mode',
    data () {
      return {
        modeIndex: 3,
        modes: [
          '延迟摄',
          '慢动作',
          '视频',
          '照片',
          '正方形',
          '全景'
        ]
      }
    },
    computed: {
      modeLeft () {
        return `-${(window.innerWidth / 6) * this.modeIndex}px`
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "Mode.scss";
</style>