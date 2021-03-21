import { Vue, namespace, Component } from 'nuxt-property-decorator'

const notificationModule = namespace('notifications')

@Component
export default class NotificationMixin extends Vue {
  @notificationModule.State('color') color!: string;
  @notificationModule.State('subText')subText!: string;
  @notificationModule.State('text') text!: string;
  @notificationModule.State('show') show!: boolean;
  @notificationModule.State('timeout') timeout!: number;

  @notificationModule.Action('setShow') setShow!: (show: boolean) => void
  @notificationModule.Action('setText') setText!: (show: string) => void
  @notificationModule.Action('setSubText') setSubText!: (show: string) => void
  @notificationModule.Action('setColor') setColor!: (show: string) => void

  cleanState () {
    const that = this
    setTimeout(() => {
      that.setShow(false)
    }, this.timeout)
  }

  showError (error: string) {
    this.showMessage(error, 'accent')
  }

  showMessage (message: string, color = 'success') {
    this.setShow(true)
    this.setColor(color)
    this.setText(message)
    this.cleanState()
  }
}
