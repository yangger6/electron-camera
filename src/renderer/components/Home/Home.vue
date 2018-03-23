<template>
    <div id="home" class="home">
        <router-view></router-view>
        <header class="photo">
            <ul>
                <li class="disabled"><img src="~@/assets/flash.png" alt=""></li>
                <li class="disabled"><img src="~@/assets/hdr.png" alt=""></li>
                <li class="disabled"><img src="~@/assets/live.png" alt=""></li>
                <li><img src="~@/assets/delaty.png" alt=""></li>
                <li><img src="~@/assets/filter.png" alt=""></li>
            </ul>
        </header>
        <c-canvas></c-canvas>
        <footer>
            <mode></mode>
            <div class="bottom-bar">
                <div class="preview">
                    <img src="" alt="">
                </div>
                <beat></beat>
                <div class="change">
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import Canvas from '../Vedio'
  import Mode from './Mode/Mode'
  import Beat from './Beat/Beat'
  export default {
    name: 'home',
    data () {
      return {}
    },
    components: {
      'c-canvas': Canvas,
      Mode,
      Beat
    }
  }
</script>
<style scoped lang="scss">
    @import "Home.scss";
    @import "Photo";
</style>