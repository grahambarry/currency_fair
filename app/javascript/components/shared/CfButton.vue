<template>
  <div>
    <div class="button" v-on="$listeners">
      <div class="label">{{ label }}</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'CfButton',
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  @import 'app/assets/stylesheets/design_vars';
  .button {
    height: 49px;
    width: auto;
    min-width: 70px;
    font-family: $PG-Medium;
    line-height: 21px;
    font-size: 16px;
    padding: 15px 18px;
    @extend %amm-flex-row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid #589AB8;
    color: #fff;
    background-color: $link-color;
    cursor: pointer;
    &:hover {
      background-color: #589BB9;
    }
  }
  @media screen and (max-width: $breakpoint-small) {

  }
</style>
