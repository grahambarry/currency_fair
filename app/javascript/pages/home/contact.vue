<template>
  <div>
    <div v-if="signedIn" ref="scrollContainer" @scroll="throttleScrollThrottled" id="parallaxid" class="parallax">
      <Alerts :alerts="errors" />
      <div class="col-md-6 offset-md-3">
        <h2>Contact Me</h2>
        <form class="simple_form form-horizontal">
          <div class="form-group email optional user_email">
            <label class="control-label email optional">
              Name
            </label>
            <input
              v-model="form.lastName"
              class="form-control string email optional"
              autofocus="autofocus"
            >
          </div>
          <div class="form-group email optional user_email">
            <label class="control-label email optional">
              Email
            </label>
            <input
              v-model="form.email"
              class="form-control string email optional"
              autofocus="autofocus"
            >
          </div>
          <div class="text-center">
            <button
              class="btn btn-default btn btn-primary"
              @click.prevent="handleSendForm"
            >
              Send Now
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Alerts from '~components/shared/alerts';
import _get from 'lodash/get';
import sendForm from '~mutations/sendContactForm';

export default {
  components: { Alerts },
  name: 'Contact',
  data() {
    return {
      errors: [],
      form: {},
      scrollDelta: 20,
      myLastScrollPos: null,
      topValue: '0px',
      lastScroll: 0,
      currentScroll: 0,
      throttleScrollThrottled: _.throttle(this.throttleScroll, 50),
      myCurrentScrollThrottled: _.throttle(this.myCurrentScroll, 100),

    } 
  },
  mounted() {
    this.currentScroll = this.$refs.scrollContainer.scrollY
  },
  methods: {
    throttleScroll: function () {
      let initialTopValue = this.topValue
      this.myLastScrollPos = this.myCurrentScroll()
      let myCurrent = this.myCurrentScrollThrottled()
      if (this.myLastScrollPos < 120 || myCurrent < 120 ) {
        this.topValue = '0px'
      }
      else {
        if (myCurrent <= (this.myLastScrollPos - 2)) {
          this.topValue = '-80px'
        }
        if (myCurrent > (this.myLastScrollPos + 2)) {
          this.topValue = '0px'
        }
      }
      initialTopValue != this.topValue ? this.changeTopValue() : null
    },
    myCurrentScroll: function () {
      return this.$refs.scrollContainer.scrollTop
    },
    changeTopValue: function () {
      this.$emit('emitTop', this.topValue)
    },
    handleSendForm() {
      sendForm({
        apollo: this.$apollo,
        ...this.form,
      }).then(response => _get(response, 'data.sendContactForm', {}))
      .then(response => {
        if(response.success) {
          const user = response.user;
          this.$router.push({ name: 'showcase' });
        } else {
          this.errors = this.errorMessages(response.data.sendContactForm.errors);
        }
      }).catch(error => {
        this.errors = [error];
      });
    },
  }
};
</script>
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/placeholders/flex-helpers';
  @import 'app/assets/stylesheets/design_vars';
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
