<template>
    <ul class="topbar">
        <flash-btn></flash-btn>
        <hdr></hdr>
        <live></live>
        <delaty></delaty>
        <filters></filters>
    </ul>
</template>

<script>
  import FlashButton from './utils/FlashButton'
  import HDR from './utils/HDR'
  import Live from './utils/Live'
  import Delaty from './utils/Delaty'
  import Filter from './utils/Filters'
  export default {
    name: 'top-bar',
    components: {
      'flash-btn': FlashButton,
      'hdr': HDR,
      'live': Live,
      'delaty': Delaty,
      'filters': Filter
    }
  }
</script>

<style lang="scss">
    ul.topbar{
        width: inherit;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        height: inherit;
        li{
            display: flex;
            width: 44px;
            color: #fff;
            justify-content: center;
            align-items: center;
            &.disabled:before{
                content: '';
                width: inherit;
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