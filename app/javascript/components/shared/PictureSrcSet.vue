<template>
  <picture>
    <source v-for="(image, index) in images" :key="index" class="image" :type="`image/${image.type}`" :media="(`min-width: ${image.minWidth}`)" :srcset="require(`../../assets/${image.src}`)">
    <img ref="root" :src="require(`../../assets/${imgSrc}`)" class="image">
  </picture>
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
      imgSrc: function() {
        return this.images[0].src
      }
    }
  }
  
</script>
<style lang="scss">
  @import 'app/assets/stylesheets/design_vars';
  .image {
    position: absolute;
    &.small {
      img {      
        width: 52vw;
        top: 14%;
        left: 80px;
      }
    }
    &.large {
      img { 
        width: 90vw;
        top: 14%;
        left: 80px;
      }
    }
    &.isLeft {
      img { 
        right: 80px !important;
        left: unset !important;
      }
    }
  }
</style>