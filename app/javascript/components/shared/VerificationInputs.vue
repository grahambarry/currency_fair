<template>
  <div class="wrapper">
    <div class="inputs-row">
      <input v-for="index in digits" 
             :key="index" 
             ref="input" 
             maxlength="1"
             @focus="clearValue(index)"
             @input="focusNext(index)">
    </div>
  </div>
</template>
<script>
export default {
  name: 'VerificationInputs',
  components: {
  },
  props: {
    digits: {
      type: Number,
      default: 6
    },
  },
  data() {
    return {
      currentIndex: 0,
      verificationCode:  new Array(this.digits),
    }
  },
  methods: {
    focusNext(index) {
      let val = event.target.value
      index < this.digits ? this.$nextTick(() => this.$refs.input[index].focus()) : ''
      this.pushDigitValue(index, val )
    },
    clearValue(index) {
      event.target.value = ''
      this.pushDigitValue(index, '' )
    },
    pushDigitValue(index, value) {
      this.verificationCode[index - 1] = value
      if (this.verificationCode.findIndex(e => (e === undefined || e === "")) > -1) {
        this.emitDisable()
      } else {
        this.emitCode()
      }
    },
    emitCode() {
      this.$emit('emittedCode', this.verificationCode)
    },
    emitDisable() {
      this.$emit('disable')
    },
  }
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  @import 'app/assets/stylesheets/design_vars';
  .wrapper {
    @extend %amm-flex-column;
    width: 100%;
    .inputs-row {
      height: 54px;
      width: 100%;
      box-sizing: border-box;
      @extend %amm-flex-row;
      align-items: center;
      justify-content:  space-between;
      input {
        caret-color: transparent;
        font-family: $PG-Medium;
        box-sizing: border-box;
        color: $black-gray;
        font-size: 28px;
        line-height: 54px;
        box-sizing: border-box;
        width: 54px;
        height: 54px;
        border-radius: 4px;
        border: 1px solid $border-gray;
        text-align: center;
        &:focus {
          border: 1px solid $alt-blue;
          outline: none;
        }
      }
    }
  }
  @media screen and (max-width: $breakpoint-small) {

  }
</style>
