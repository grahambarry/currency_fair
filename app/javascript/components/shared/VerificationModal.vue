<template>
  <div>
    <Modal :show-modal.sync="showModal"
           v-on="$listeners"
           width="580px">
      <template #header>
        <div class="header-container">
          <div class="flex-row title">
            <img :src="require(`../../assets/icon-lock.svg`)" class="icon">
            Identity verification required
          </div>
          <div class="flex-row subtitle">
            For your security, we ocassionally require you to verify your identity by 
            entering a code sent to your mobile device.
          </div>
        </div>
      </template>
      <template #body-modal>
        <div class="body-container">
          <VerificationInputs @disable="canVerify = false"
                              @emittedCode="handleVerificationCode"/>
        </div>
      </template>
      <template #actions>
        <div class="actions-container">
          <CfButton label="Verify Identity"
                    :disabled="!canVerify"/>
          <CfButton label="Cancel"
                    secondary
                    class="but-2"/>
          <router-link :to="{ name: 'Transaction info' }" class="link">
            I can’t access this mobile device
          </router-link>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>

import PromptText from '~components/shared/PromptText.vue'
import Modal from '~components/shared/Modal.vue'
import CfButton from '~components/shared/CfButton.vue'
import VerificationInputs from '~components/shared/VerificationInputs.vue'

export default {
  name: 'VerificationModal',
  components: {
    PromptText,
    Modal,
    CfButton,
    VerificationInputs,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      canVerify: false,
    }
  },
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(val) {
        return this.$emit('update:show', val)
      }
    }
  },
  methods: {
    handleVerificationCode(emittedCode) {
      this.canVerify = true
    }
  }
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  @import 'app/assets/stylesheets/design_vars';
  .header-container {
    padding: 30px 31px 21px 31px;
    @extend %amm-flex-column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border-bottom: 1px solid $border-gray;
    .flex-row {
      @extend %amm-flex-row;
      width: 100%;
      .icon {
        transform: translate(-4px, -3px);
        margin-right: 6px;
      }
      &.title {
        font-family: $PG-Medium;
        font-size: 18px;
        line-height: 27px;
        color: #768895;
      }
      &.subtitle {
        width: 442px;
        font-family: $PG-Book;
        font-size: 14px;
        line-height: 21px;
        color: #808080;
      }
    }
  }
  .body-container {
    box-sizing: border-box;
    padding: 52px 103px 53px 93px;
    height: 258px;
    @extend %amm-flex-column;
    background-color: #FBFCFC;
    width: 100%;
    flex-grow: 1;
  }
  .actions-container {
    @extend %amm-flex-row;
    align-items: center;
    width: 100%;
    background-color: #EDF0F3;
    height: 90px;
    border-top: 1px solid $border-gray;
    padding: 26px 31px 29px 28px;
    .but-2 {
      margin-left: 16px;
    }
    .link {
      margin-left: auto;
      font-family: $PG-Medium;
      font-size: 12px;
      line-height: 27px;
      text-decoration: none;
      color: $link-color;

    }
  }
  @media screen and (max-width: $breakpoint-small) {

  }
</style>
