<template>
    <div ref="box" class="preview animated">
        <img ref="img" src=" " alt="">
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'preview',
    computed: {
      ...mapGetters([
        'imgDataUrl'
      ])
    },
    watch: {
      imgDataUrl (val) {
        let img = this.$refs.img
        img.src = ''
        if (img.classList.length > 0) {
          img.classList.remove('animated')
        }
        img.width = img.width // 重新触发动画
        img.classList.add('animated')
        setTimeout(() => {
          img.src = val
          img.style.transform = 'scale(0)'
          setTimeout(() => {
            img.style.transform = 'scale(1)'
          }, 490)
        }, 210)
      }
    }
  }
</script>
<style scoped lang="scss">
    .preview{
        border-radius: 5px;
        width: 50px;
        height: 50px;
        margin: 20px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
            border: none;
            width: 53px;
            height: 53px;
            background: #1c1719;
            margin: -1px;
            object-fit: cover;
            transform: scale(1);
            &[src='']{
                opacity: 0;
            }
            &.animated{
                animation: fadein .7s linear;
            }
            @keyframes fadein {
                30% {
                    background: #000;
                }
                70%{
                    transform: scaleY(1.2);
                }
                to{
                    transform: scaleY(1);
                }
            }
        }
    }
</style>