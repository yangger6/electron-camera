<template>
    <div id="home" class="home">
        <router-view></router-view>
        <header :class="selectMode.mode">
                <top-bar>
                </top-bar>
        </header>
        <v-camera></v-camera>

        <footer :class="selectMode.mode">
            <mode></mode>
            <filters type="filters"></filters>
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
  import TopBar from './TopBar/TopBar'
  import Filter from './TopBar/utils/Filters'
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
      'top-bar': TopBar,
      'filters': Filter,
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