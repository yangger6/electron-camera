<template>
    <li v-if="type === 'top-bar'"  @click="changeUtilsState">
        <img :src="filterSrc" alt="filter">
    </li>
    <div class="filters-box" :class="{ show: filterStore.state === 1 }" v-else-if="type === 'filters'" :data-name="filterName">
        <span></span>
        <ul class="filters-preview">
            <div :style="{left: filterLeft}" :data-index="filterStore.selectIndex" ref="filterBar" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
                <li v-for="(filter, index) in filterStore.filters" :class="{ selected: filterStore.selectIndex === index }">
                    <figure :class="filter">
                        <video class="filters-video"></video>
                    </figure>
                </li>
            </div>
        </ul>
    </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'filters',
    data () {
      return {
        isTap: false,
        oldX: 0
      }
    },
    props: {
      type: String
    },
    methods: {
      ...mapActions([
        'updateUtils'
      ]),
      changeUtilsState () {
        this.$store.commit('CHANGE_UTILS_STATE', {name: 'filter'})
      },
      mousedown (e) {
        this.isTap = true
        this.oldX = e.clientX
      },
      mousemove (e) {
        if (!this.isTap) return
        let moveLength = e.clientX - this.oldX
        if (moveLength > 20) {
          let index = this.$refs.filterBar.dataset.index
          if (index > 0) {
            this.oldX = e.clientX
            this.$store.commit('CHANGE_UTILS_FILTERS_SELECTINDEX', --index)
          }
          this.isTap = false
        } else if (Math.abs(moveLength) > 20) {
          let index = this.$refs.filterBar.dataset.index
          if (index < this.filterStore.filters.length - 1) {
            this.oldX = e.clientX
            this.$store.commit('CHANGE_UTILS_FILTERS_SELECTINDEX', ++index)
          }
          this.isTap = false
        }
      },
      mouseup () {
        this.isTap = false
      }
    },
    computed: {
      filterStore () {
        return this.$store.getters.getUtilsByName('filter')
      },
      filterLeft () {
        return `${163 - this.filterStore.selectIndex * 55}px`
      },
      filterName () {
        return this.filterStore.filters[this.filterStore.selectIndex]
      },
      filterSrc () {
        return this.filterStore.selectIndex > 0 ? require('@/assets/filter-color.png') : require('@/assets/filter.png')
      }
    },
    mounted () {
      if (this.type === 'filters') {
        let videoList = [...document.querySelectorAll('.filters-video')]
        navigator.mediaDevices.getUserMedia({ video: {width: 50, height: 50}, audio: false })
          .then(function (stream) {
            videoList.map(video => {
              video.srcObject = stream
              video.play()
            })
          })
          .catch(function (err) {
            console.log('An error occured!' + err)
          })
      }
    }
  }
</script>
<style lang="scss">
    .filters-box{
        transition: height .3s ease;
        width: 100%;
        position: relative;
        height: 0;
        overflow: hidden;
        &.show{
            height: 54px;
        }
        &.show:before{
            content: '';
            position: fixed;
            width: inherit;
            height: 30px;
            background: #000;
            bottom: 148px;
        }
        &.show > .filters-preview > div{
            position: fixed;
        }
        &.show:after{
            content: attr(data-name);
            position: fixed;
            background: #fff;
            bottom: 195px;
            transform: translateX(-50%);
            left: 50%;
            border-radius: 2px;
            color: #000;
            padding: 0 5px;
        }
        .filters-preview{
            width: 50px;
            height: 50px;
            overflow: hidden;
            display: flex;
            margin: 0 auto;
            border: 2px solid #fff;
            border-radius: 2px;
            position: relative;
            div{
                width: 100%;
                display: flex;
                transition: left .3s ease;
            }
            li{
                width: 50px;
                height: 50px;
                position: relative;
                &:first-child:after{
                    content: '';
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #fff;
                    top: -15px;
                    transform: translateX(-50%);
                    left: 25px;
                    border-radius: 2px;
                }
                &:not(:first-child){
                    margin-left: 5px;
                }
            }
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
            filter: blur(1px);
        }
        &.tint {
            filter: sepia(1) hue-rotate(200deg);
        }
        &.multiple {
            filter: contrast(1.4) saturate(1.8) sepia(.6);
        }
        &.inkwell {
            filter: grayscale(1) brightness(0.45) contrast(1.05);
        }
    }
</style>