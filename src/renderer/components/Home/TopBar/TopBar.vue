<template>
    <ul class="topbar">
        <flash-btn v-show="isUse('flash')" ></flash-btn>
        <hdr v-show="isUse('hdr')" ></hdr>
        <live v-show="isUse('live')" ></live>
        <delaty @toLeft="utilsToLeft" v-show="isUse('delaty')"></delaty>
        <filters v-show="isUse('filter')" type="top-bar"></filters>
    </ul>
</template>
<script>
  import FlashButton from './utils/FlashButton'
  import HDR from './utils/HDR'
  import Live from './utils/Live'
  import Delaty from './utils/Delaty'
  import Filter from './utils/Filters'
  import { mapGetters } from 'vuex'
  export default {
    name: 'top-bar',
    components: {
      'flash-btn': FlashButton,
      'hdr': HDR,
      'live': Live,
      'delaty': Delaty,
      'filters': Filter
    },
    data () {
      return {
        selectUtil: ''
      }
    },
    methods: {
      utilsToLeft (e) {
        let utilName = e.$options.name
        if (this.selectUtil === utilName) { // 再次点击还原
          this.selectUtil = ''
          return
        }
        this.selectUtil = utilName // 子元素点击，过滤掉其他工具=.=
      }
    },
    computed: {
      ...mapGetters([
        'usingUtils'
      ]),
      isUse () {
        let vm = this
        return unitName => {
          if (vm.selectUtil) {
            return vm.selectUtil === unitName
          }
          return vm.usingUtils.indexOf(unitName) > -1
        }
      }
    }
  }
</script>

<style lang="scss">
    ul.topbar{
        width: inherit;
        height: 44px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        li{
            display: flex;
            width: 44px;
            color: #fff;
            justify-content: center;
            align-items: center;
            &.disabled:before{
                content: '';
                width: 44px;
                height: 2px;
                border: 2px solid #000;
                z-index: 1;
                background: white;
                position: absolute;
                transform: rotate(45deg) scale(0.7);
            }
            &:nth-child(3).disabled:before {
                height: 1px;
                border: 1px solid #000;
                transform: rotate(45deg) scale(1);
            }
            img {
                transform: scale(0.6);
            }
        }
    }
</style>