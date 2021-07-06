<template>
  <img ref="root" v-webp="{image: require(`../../assets/${images[1].src}`), webp: require(`../../assets/${images[0].src}`)}" class="image">
</template>

<script>
  export default {
    name: "PictureSrcSet",
    props: {
      images: {
        type: Array,
        required: true,
      }
    }
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