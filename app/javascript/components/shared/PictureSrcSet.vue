<template>
  <img ref="root" v-webp="{image: images[1].src, webp: images[0].src}" class="image">
  <!-- <picture>
    <source v-for="(image, index) in images" :key="index" class="image" :src="`${image.src}`" :media="(`maxWidth: ${image.maxWidth}`)" :type="`image/${image.type}`" >
    <img ref="root" :srcset="sources">
  </picture> -->
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
  .image {
    position: absolute;
    picture {
      display: block;
    }
    img {
      width: 100%;
      display: block;
    }
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