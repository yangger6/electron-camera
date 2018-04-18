<template>
    <li class="delay" :class="{open: open}">
        <a>
            <img :src="Src" alt="delay" @click="toLeft" class="delay-time">
            <span class="time" :style="{display: open ? 'none' : ''}">{{tips}}</span>
        </a>
        <div v-for="mode in modes"  :style="{display: open ? '' : 'none'}">
            <span :style="{color : mode.value === delayStore.time ? '#e3bd3f' : ''}" @click="changeTime(mode.value)">{{mode.name}}</span>
        </div>
    </li>
</template>
<script>
  export default {
    name: 'delay',
    data () {
      return {
        open: false,
        modes: [
          {name: '关闭', value: 0},
          {name: '3秒', value: 3},
          {name: '10秒', value: 10}
        ]
      }
    },
    methods: {
      toLeft () {
        this.open = !this.open
        this.$emit('toLeft', this)
      },
      changeTime (value) {
        this.$store.commit('CHANGE_UTILS_DELAY_TIME', value)
        this.open = !this.open
        this.$emit('toLeft', this)
      }
    },
    computed: {
      delayStore () {
        return this.$store.getters.getUtilsByName('delay')
      },
      tips () {
        let time = this.delayStore.time
        return time > 0 ? `${time}s` : ''
      },
      Src () {
        return require(`@/assets/delay${this.delayStore.state ? '-open' : ''}.png`)
      }
    }
  }
</script>
<style scoped lang="scss">
    .delay{
        display: flex;
        width: 44px;
        transition: width 1s ease;
        &.open{
            width: 100%;
            a{
                padding-right: 25px;
            }
        }
        a{
            width: 26.4px;
            height: 26.4px;
            justify-content: center;
            align-items: center;
            display: flex;
        }
        img {
            padding: 15px;
            &.delay-time{
                padding: 0;
                & + .time{
                    display: block;
                    color: #e3bd3f;
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