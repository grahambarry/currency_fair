<template>
  <img ref="root" :srcset="sources">
</template>

<script>
  export default {
    name: "PictureSrcSet",
    props: {
      images: {
        type: Array,
        required: true,
      }
    },
    computed: {
      sources: function() {
        let source = ''
        for(let i = 0; i < this.images.length; i++ ) {
          source += this.images[i].src + ', '
        }
        return source
      }
    },
  }
  
</script>
<style lang="scss">
  @import 'app/assets/stylesheets/design_vars';
  img.image {
    position: absolute;
    &.small {
      width: 52vw;
      top: 14%;
      left: 80px;
    }
    &.large { 
      width: 90vw;
      top: 14%;
      left: 80px;
    }
    &.isLeft {
      right: 80px !important;
      left: unset !important;
    }
  }
</style>