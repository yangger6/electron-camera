<template>
    <li v-if="type === 'top-bar'">
        <img src="~@/assets/filter.png" alt="filter" @click="">
    </li>
    <ul v-else-if="type === 'filters'" class="filters-preview">
    </ul>
</template>
<script>
  export default {
    name: 'filters',
    props: {
      type: String
    },
    methods: {
    }
  }
</script>
<style lang="scss">
    .filters-preview{
        width: 100%;
        transition: height .3s ease;
        height: 0;
        overflow: hidden;
        display: flex;
        li{
            width: 50px;
            height: 50px;
        }
    }
    figure{
        &.grayscale {
            filter: grayscale(1);
        }
        &.sepia {
            filter: sepia(1);
        }
        &.saturate {
            filter: saturate(4);
        }
        &.invert {
            filter: invert(.8);
        }
        &.opacity {
            filter: opacity(.5);
        }
        &.brightness {
            filter: brightness(.5);
        }
        &.contrast {
            filter: contrast(3);
        }
        &.blur {
            filter: blur(5px);
        }
        &.tint {
            filter: sepia(1) hue-rotate(200deg);
        }
        &.multiple-filters {
            filter: contrast(1.4) saturate(1.8) sepia(.6);
        }
        &.inkwell {
            filter: grayscale(1) brightness(0.45) contrast(1.05);
        }
    }
</style>