import { mapFields } from 'vuex-map-fields'

export default {
  computed: {
    ...mapFields('notifications', ['color', 'show', 'subText', 'text', 'timeout'])
  },

  methods: {
    cleanState () {
      const that = this
      setTimeout(() => {
        that.show = false
      }, this.timeout)
    },

    showError (error) {
      this.showMessage(error, 'accent')
    },

    showMessage (message, color = 'success') {
      this.show = true
      this.color = color

      if (typeof message === 'string') {
        this.text = message
        this.cleanState()

        return
      }

      this.text = message.message

      if (message.response) { this.subText = message.response.data.message }

      this.cleanState()
    }
  }
}
