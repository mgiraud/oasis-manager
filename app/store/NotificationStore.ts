import { PersistentStore } from '~/store/main'
import { MUTATIONS } from '~/store/notifications'

export interface NotificationState {
  show: boolean
  color: string
  text: string
  subText: string
  timeout: number
}

class NotificationStore extends PersistentStore<NotificationState> {
  protected data (): NotificationState {
    return {
      show: false,
      color: 'error',
      text: 'An error occurred',
      subText: '',
      timeout: 10000
    }
  }

  setShow (show: boolean) {
    this.state.show = show
  }

  setColor (color: string) {
    this.state.color = color
  }

  setText (text: string) {
    this.state.text = text
  }

  setSubText (subText: string) {
    this.state.subText = subText
  }

  setTimeout (timeout: number) {
    this.state.timeout = timeout
  }

  cleanState () {
    const that = this
    setTimeout(() => {
      that.setShow(false)
    }, this.state.timeout)
  }

  showError (error: string) {
    this.showMessage(error, 'accent')
  }

  showMessage (message: string, color: string = 'success') {
    this.setShow(true)
    this.setColor(color)
    this.setText(message)
    this.cleanState()
  }
}

export const notificationStore = new NotificationStore('notifications')
