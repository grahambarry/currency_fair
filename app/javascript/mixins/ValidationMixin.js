/* eslint-disable no-extra-boolean-cast */
import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full'
import ErrorMessage from '~components/shared/ErrorMessage'

extend('NumberExpiry', {
  params: ['target'],
  validate(value, { target }) {
    if (value !== '')
      return target !== '' && target !== null
    true
  },
  message: 'This field needs a number and an expiration date'
})

extend('positive', {
  validate(value) {
    if (value !== '')
      return value > 0
    true
  },
  message: 'This field should be bigger than 0'
})

extend('payslip', {
  validate(value) {
    if (value !== '')
      return value.match(/^\d\d?\d?\d?\d?$/)
    true
  },
  message: 'This field should be numeric and have 5 digits as much'
})

export default {
  components: {
    ValidationProvider,
    ErrorMessage
  },
  props: {
    rules: {
      type: [String, Object],
      default: ''
    },
    immediate: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'aggressive'
    },
    /**
     * Example: { type: 'pending', message: 'This field is pending approval' }
     * Three types are accepted: pending, success and error
     *
     * Do not provide server errors using this prop. Instead, consider using the validationName prop
     * and providing the error to the ValidatonObserver.
     */
    status: {
      type: Object,
      default: undefined
    },
    /**
     * To be used with serverside validation. Only use when label is not enough.
     * https://vee-validate.logaretm.com/v3/advanced/server-side-validation.html#setting-errors-manually
     */
    validationName: {
      type: String,
      default: undefined
    }
  },
  computed: {
    message() {
      if (!!this.$refs.provider?.errors?.length)
        return this.$refs.provider.errors[0]

      return this.status.message
    }
  }
}
