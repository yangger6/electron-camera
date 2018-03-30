<template>
    <div class="beat">
        <div :class="selectMode.mode" @mousedown="beat(1)" @mouseup="beat(0)"></div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'beat',
    computed: {
      ...mapGetters([
        'selectMode'
      ])
    },
    methods: {
      beat (state) {
        this.$store.commit('CHANGE_STATE', state)
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "bate.scss";
</style>