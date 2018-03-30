<template>
    <div id="home" class="home">
        <router-view></router-view>
        <header :class="selectMode.mode">
            <ul>
                <li class="disabled"><img src="~@/assets/flash.png" alt=""></li>
                <li class="disabled"><img src="~@/assets/hdr.png" alt=""></li>
                <li class="disabled"><img src="~@/assets/live.png" alt=""></li>
                <li><img src="~@/assets/delaty.png" alt=""></li>
                <li><img src="~@/assets/filter.png" alt=""></li>
            </ul>
        </header>
        <v-camera></v-camera>
        <footer :class="selectMode.mode">
            <mode></mode>
            <div class="bottom-bar">
                <preview></preview>
                <beat></beat>
                <change-mode></change-mode>
            </div>
        </footer>
    </div>
</template>
<script>
  import Vedio from '../Vedio'
  import Mode from './Mode/Mode'
  import Beat from './Beat/Beat'
  import ChengMode from './ChangeMode/ChangeMode'
  import Preview from './Preview/Preview'
  import { mapGetters } from 'vuex'

  export default {
    name: 'home',
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'selectMode'
      ])
    },
    components: {
      'v-camera': Vedio,
      'change-mode': ChengMode,
      Mode,
      Beat,
      Preview
    }
  }
</script>
<style scoped lang="scss">
    @import "Home.scss";
    @import "Modes";
</style>