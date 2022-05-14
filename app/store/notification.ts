import { defineStore } from 'pinia'

interface NotificationState {
  show: boolean
  color: string
  text: string
  subText: string
  timeout: number
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => {
    return {
      show: false,
      color: 'accent',
      text: 'An error occurred',
      subText: '',
      timeout: 5000
    }
  },
  actions: {
    setShow (show: boolean) {
      this.show = show
    },

    setColor (color: string) {
      this.color = color
    },

    setText (text: string) {
      this.text = text
    },

    setSubText (subText: string) {
      this.subText = subText
    },

    setTimeout (timeout: number) {
      this.timeout = timeout
    },

    cleanState () {
      const that = this
      setTimeout(() => {
        that.setShow(false)
      }, this.timeout)
    },

    showError (error: string) {
      this.showMessage(error, 'accent')
    },

    showMessage (message: string, color: string = 'primary') {
      this.setShow(true)
      this.setColor(color)
      this.setText(message)
      this.cleanState()
    }
  },
})
