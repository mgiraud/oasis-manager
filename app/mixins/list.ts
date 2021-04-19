import { Watch, namespace, Component, mixins } from 'nuxt-property-decorator'
import isEmpty from 'lodash/isEmpty'
import NotificationMixin from './notification'
import { HydraMemberObject, HydraGetRequestFilter } from '~/api/hydra'

const securityModule = namespace('security')

@Component
export default class ListMixin extends mixins(NotificationMixin) {
  options: HydraGetRequestFilter = {
    sortBy: [],
    sortDesc: [],
    page: 1,
    itemsPerPage: 15,
    totalItems: 0
  }

  filters: {[key: string]: string} = {}
  totalItems!: number
  fetchAll!: (params: HydraGetRequestFilter) => any[]
  resetList !: (reset: boolean) => void
  deleteItem !: (item: HydraMemberObject & any) => Promise<void>

  @securityModule.Getter('hasPermission') hasPermission!: (permission: string) => boolean

  @Watch('deletedItem')
  onDeletedItem (item: HydraMemberObject) {
    this.showMessage(`${item['@id']} deleted.`)
  }

  @Watch('error')
  onError (message: string | null) {
    message && this.showError(message)
  }

  @Watch('items')
  onItems () {
    this.options.totalItems = this.totalItems
  }

  onUpdateOptions ({ page, itemsPerPage, sortBy, sortDesc, totalItems }: HydraGetRequestFilter = {}) {
    let params: HydraGetRequestFilter & {[key:string]: string} = {
      ...this.filters
    }
    if (itemsPerPage && itemsPerPage > 0) {
      // @ts-ignore
      params = { ...params, itemsPerPage, page }
    }

    if (!isEmpty(sortBy) && !isEmpty(sortDesc)) {
      // @ts-ignore
      params[`order[${sortBy[0]}]`] = sortDesc[0] ? 'desc' : 'asc'
    }

    this.resetList(true)

    Object.assign(this.options, {
      sortBy,
      sortDesc,
      itemsPerPage,
      totalItems
    })
    this.fetchAll(params)
  }

  onSendFilter () {
    this.resetList(true)
    // this.onUpdateOptions(this.options)
  }

  resetFilter () {
    this.filters = {}
    this.onSendFilter()
  }

  addHandler () {
    this.$router.push({ name: `${this.$options.servicePrefix}-new` })
  }

  showHandler (item: HydraMemberObject) {
    this.$router.push({
      name: `${this.$options.servicePrefix}-id`,
      params: { id: item['@id'] }
    })
  }

  editHandler (item: HydraMemberObject) {
    const id = this.$options.resourcePrefix ? item['@id'].replace(this.$options.resourcePrefix, '') : item['@id']
    this.$router.push({
      name: `${this.$options.servicePrefix}-id`,
      params: { id }
    })
  }

  deleteHandler (item: HydraMemberObject) {
    // this.deleteItem(item).then(() => this.onUpdateOptions(this.options))
  }
}
