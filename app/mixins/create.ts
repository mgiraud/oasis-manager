import { Watch, namespace, Component, mixins } from 'nuxt-property-decorator'
import { validationMixin } from 'vuelidate'
import { HydraMemberObject } from '~/api/hydra'
import NotificationMixin from '~/mixins/notification'
import { ElementWithValidation } from '~/vue-shim'

const securityModule = namespace('security')

@Component({
  mixins: [validationMixin]
})
export default class CreateMixin extends mixins(NotificationMixin) {
  @securityModule.Getter('hasPermission') hasPermission!: (permission: string) => boolean
  create !: (item: HydraMemberObject & any) => Promise<HydraMemberObject>
  item = {}

  onCreated (item: HydraMemberObject | null) {
    if (item === null) {
      return
    }
    const id = this.$options.resourcePrefix ? item['@id'].replace(this.$options.resourcePrefix, '') : this.$options.resourcePrefix
    this.showMessage(`${id} created`)

    if (!id) {
      return
    }
    this.$router.push({
      name: `${this.$options.servicePrefix}-id`,
      params: { id }
    })
  }

  onSendForm () {
    const createForm = this.$refs.createForm as ElementWithValidation
    createForm.$v.$touch()
    if (!createForm.$v.$invalid) {
      this.create(createForm.$v.item.$model)
    }
  }

  resetForm () {
    (this.$refs.createForm as ElementWithValidation).$v.$reset()
    this.item = {}
  }

  @Watch('created')
  onItemCreated (created: HydraMemberObject | null) {
    if (!created) {
      return
    }
    this.onCreated(created)
  }

  @Watch('error')
  onError (message: string | null) {
    message && this.showError(message)
  }
}
