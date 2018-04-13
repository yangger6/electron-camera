<template>
    <li class="delaty" :class="{open: open}">
        <img src="~@/assets/delaty.png" alt="delaty" @click="toLeft" class="">
        <span class="time">3s</span>
        <div v-for="mode in modes"  :style="{display: open ? '' : 'none'}">
            {{mode.name}}
        </div>
    </li>
</template>
<script>
  export default {
    name: 'delaty',
    data () {
      return {
        open: false,
        modes: [
          {name: '关闭', value: 0},
          {name: '3秒', value: 3},
          {name: '5秒', value: 5}
        ]
      }
    },
    methods: {
      toLeft () {
        this.open = !this.open
        this.$emit('toLeft', this)
      }
    },
    computed: {
      delatyStore () {
        return this.$store.getters.getUtilsByName('delaty')
      }
    }
  }
</script>
<style scoped lang="scss">
    .delaty{
        display: flex;
        width: 44px;
        transition: width 1s ease;
        &.open{
            width: 100%;
        }
        img {
            padding: 15px;
            &.delaty-time{
                padding: 0;
                & + .time{
                    display: block;
                }
            }
        }
        span.time{
            display: none;
        }
        div{
            width: calc(100% - 44px);
        }
    }
</style>