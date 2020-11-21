import { validationMixin } from 'vuelidate'
import notification from './notification'

export default {
  mixins: [notification, validationMixin],
  methods: {
    onCreated (item) {
      const id = this.$options.resourcePrefix ? item['@id'].replace(this.$options.resourcePrefix, '') : this.$options.resourcePrefix
      this.showMessage(`${id} created`)

      this.$router.push({
        name: `${this.$options.servicePrefix}-id`,
        params: { id }
      })
    },
    onSendForm () {
      const createForm = this.$refs.createForm
      createForm.$v.$touch()
      if (!createForm.$v.$invalid) {
        this.create(createForm.$v.item.$model)
      }
    },
    resetForm () {
      this.$refs.createForm.$v.$reset()
      this.item = {}
    }
  },
  watch: {
    created (created) {
      if (!created) {
        return
      }

      this.onCreated(created)
    },

    error (message) {
      message && this.showError(message)
    }
  }
}
