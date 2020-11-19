import notification from './notification'

export default {
  mixins: [notification],
  data () {
    return {
      item: {}
    }
  },
  created () {
    const id = this.$options.resourcePrefix ? this.$options.resourcePrefix + this.$route.params.id : this.$route.params.id
    this.retrieve(decodeURIComponent(id))
  },
  beforeDestroy () {
    this.reset()
  },
  computed: {
    retrieved () {
      const id = this.$options.resourcePrefix ? this.$options.resourcePrefix + this.$route.params.id : this.$route.params.id
      return this.find(decodeURIComponent(id))
    }
  },
  methods: {
    del () {
      this.deleteItem(this.retrieved).then(() => {
        this.showMessage(`${this.item['@id']} deleted.`)
        this.back()
      })
    },
    reset () {
      this.$refs.updateForm.$v.$reset()
      this.updateReset()
      this.delReset()
      this.createReset()
    },
    back () {
      this.$router
        .push({ name: `${this.$options.servicePrefix}` })
    },

    onSendForm () {
      const updateForm = this.$refs.updateForm
      updateForm.$v.$touch()

      if (!updateForm.$v.$invalid) {
        this.update(updateForm.$v.item.$model)
      }
    },

    resetForm () {
      this.$refs.updateForm.$v.$reset()
      this.item = { ...this.retrieved }
    }
  },
  watch: {
    deleted (deleted) {
      if (!deleted) {
        return
      }
      this.$router
        .push({ name: `${this.$options.servicePrefix}` })
        .catch(() => {})
    },

    error (message) {
      message && this.showError(message)
    },

    deleteError (message) {
      message && this.showError(message)
    },

    updated (val) {
      this.showMessage(`${val['@id']} updated.`)
    },

    retrieved (val) {
      this.item = { ...val }
    }
  }
}
