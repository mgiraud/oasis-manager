import { Watch, namespace, Component, mixins } from 'nuxt-property-decorator'
import NotificationMixin from './notification'
import { HydraMemberObject } from '~/api/hydra'
import { ElementWithValidation } from '~/vue-shim'

const securityModule = namespace('security')

@Component
export default class UpdateMixin extends mixins(NotificationMixin) {
  item : HydraMemberObject | {} = {}

  @securityModule.Getter('hasPermission') hasPermission!: (permission: string) => boolean
  retrieve !: (id: string) => void
  find !: (id: string) => HydraMemberObject | null
  deleteItem !: (item: HydraMemberObject) => Promise<void>
  createReset!: () => void
  delReset!: () => void
  updateReset!: () => void
  update !: (item: HydraMemberObject & any) => Promise<HydraMemberObject>

  created () {
    const id = this.$options.resourcePrefix ? this.$options.resourcePrefix + this.$route.params.id : this.$route.params.id
    this.retrieve(decodeURIComponent(id))
  }

  beforeDestroy () {
    this.reset()
  }

  get retrieved () {
    const id = this.$options.resourcePrefix ? this.$options.resourcePrefix + this.$route.params.id : this.$route.params.id
    return this.find(decodeURIComponent(id))
  }

  del () {
    if (!this.retrieved) {
      return
    }
    this.deleteItem(this.retrieved).then(() => {
      // @ts-ignore
      const id = this.$options.resourcePrefix ? this.item['@id'].replace(this.$options.resourcePrefix, '') : this.$options.resourcePrefix
      this.showMessage(`${id} deleted.`)
      this.back()
    })
  }

  reset () {
    (this.$refs.updateForm as ElementWithValidation).$v.$reset()
    this.updateReset()
    this.delReset()
    this.createReset()
  }

  back () {
    this.$router
      .push({ name: `${this.$options.servicePrefix}` })
  }

  onSendForm () {
    const updateForm = this.$refs.updateForm as ElementWithValidation
    updateForm.$v.$touch()

    if (!updateForm.$v.$invalid) {
      this.update(updateForm.$v.item.$model)
    }
  }

  resetForm () {
    (this.$refs.updateForm as ElementWithValidation).$v.$reset()
    this.item = { ...this.retrieved }
  }

  @Watch('deleted')
  onDeleted (deleted: HydraMemberObject) {
    if (!deleted) {
      return
    }
    this.$router
      .push({ name: `${this.$options.servicePrefix}` })
      .catch(() => {})
  }

  @Watch('error')
  onError (message: string | null) {
    message && this.showError(message)
  }

  @Watch('deleteError')
  onDeleteError (message: string | null) {
    message && this.showError(message)
  }

  @Watch('updated')
  onUpdated (val: HydraMemberObject) {
    const id = this.$options.resourcePrefix ? val['@id'].replace(this.$options.resourcePrefix, '') : this.$options.resourcePrefix
    this.showMessage(`${id} updated.`)
  }

  @Watch('retrieved')
  onRetrieved (val: HydraMemberObject) {
    this.item = { ...val }
  }
}
