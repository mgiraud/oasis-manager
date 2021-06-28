import { reactive, ref, useRouter, watch } from '@nuxtjs/composition-api'
import isEmpty from 'lodash/isEmpty'
import { HydraGetRequestFilter, HydraMemberObject } from '~/api/hydra'
import { notificationStore } from '~/custom-store/NotificationStore'
import { PersistentApiStore } from '~/custom-store/AbstractStore'

const itemList = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>, additionalOptions ?: HydraGetRequestFilter) => {
  const router = useRouter()
  const selected = ref([])
  const options = {
    sortBy: [],
    sortDesc: [],
    page: 1,
    itemsPerPage: 15,
    totalItems: 0
  }

  if (additionalOptions) {
    Object.assign(options, additionalOptions)
  }

  const filterOptions: HydraGetRequestFilter = options

  const filters: { [key: string]: string | null } = {}

  watch(() => store.getState().deleted, (item: HydraMemberObject | null) => {
    item && notificationStore.showMessage(`${item['@id']} deleted.`)
  })

  watch(() => store.getState().error, (message: string | null) => {
    message && notificationStore.showError(message)
  })

  watch(() => store.getState().totalItems, (totalItems) => {
    filterOptions.totalItems = totalItems
  })

  const onUpdateOptions = ({ page, itemsPerPage, sortBy, sortDesc, totalItems }: HydraGetRequestFilter = {}) => {
    let params: HydraGetRequestFilter & { [key: string]: string | null } = {
      ...filters
    }

    if (itemsPerPage && itemsPerPage > 0) {
      // @ts-ignore
      params = { ...params, itemsPerPage, page }
    }

    store.prepareResetList()

    if (!isEmpty(sortBy) && !isEmpty(sortDesc)) {
      // @ts-ignore
      params[`order[${sortBy[0]}]`] = sortDesc[0] ? 'desc' : 'asc'
    }

    Object.assign(filterOptions, {
      sortBy,
      sortDesc,
      itemsPerPage,
      totalItems
    })

    store.fetchAll(params)
  }

  const onSendFilter = () => {
    onUpdateOptions(filterOptions)
  }

  const resetFilter = () => {
    for (const prop of Object.getOwnPropertyNames(filters)) {
      filters[prop] = null;
    }
    onSendFilter()
  }

  const addHandler = () => {
    const location = store.getAddLocation()
    if (location) {
      router.push(location)
    }
  }

  const editHandler = (item: U) => {
    const location = store.getEditLocation(item)
    location && router.push(location)
  }

  const showHandler = (item: U) => {
    editHandler(item)
  }

  const deleteHandler = (item: U) => {
    store.del(item).then(() => onUpdateOptions(filterOptions))
  }

  return reactive({
    selected,
    filterOptions,
    filters,
    resetFilter,
    addHandler,
    editHandler,
    showHandler,
    deleteHandler,
    onUpdateOptions,
    onSendFilter,
    state: store.getState(),
    items: store.list
  })
}

export default itemList
