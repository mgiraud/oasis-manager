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
    const id = this.$options.resourcePrefix ? this.$options.resourcePrefix + this.$route.params.id : this.$route.params.id
    this.retrieve(decodeURIComponent(id))
  }

  get item () {
    const id = this.$options.resourcePrefix ? this.$options.resourcePrefix + this.$route.params.id : this.$route.params.id
    return this.find(decodeURIComponent(id))
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

  back () {
    this.$router.push({ name: `${this.$options.servicePrefix}` })
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
    // this.reset()
  }
}
