import { Watch, namespace, Component, mixins } from 'nuxt-property-decorator'
import NotificationMixin from './notification'
import { HydraMemberObject } from '~/api/hydra'

const securityModule = namespace('security')

@Component
export default class ShowMixin extends mixins(NotificationMixin) {
  retrieve !: (id: string) => void
  find !: (id: string) => HydraMemberObject | null
  deleteItem !: (item: HydraMemberObject) => Promise<void>
  reset!: () => void

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  }

  get item () {
    return this.find(decodeURIComponent(this.$route.params.id))
  }

  @securityModule.Getter('hasPermission') hasPermission!: (permission: string) => boolean

  del () {
    if (!this.item) {
      return
    }
    this.deleteItem(this.item).then(() => {
      if (!this.item) {
        return
      }
      this.showMessage(`${this.item['@id']} deleted.`)
      this.$router
        .push({ name: `${this.$options.servicePrefix}` })
        .catch(() => {})
    })
  }

  editHandler () {
    if (!this.item) {
      return
    }
    this.$router.push({
      name: `${this.$options.servicePrefix}-id`,
      params: { id: this.item['@id'] }
    })
  }

  @Watch('error')
  onError (message: string | null) {
    message && this.showError(message)
  }

  @Watch('deleteError')
  onDeleteError (message: string | null) {
    message && this.showError(message)
  }

  beforeDestroy () {
    this.reset()
  }
}
