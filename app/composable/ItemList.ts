import { reactive, Ref, ref, useRouter, watch } from '@nuxtjs/composition-api'
import isEmpty from 'lodash/isEmpty'
import { HydraGetRequestFilter, HydraMemberObject } from '~/api/hydra'
import { notificationStore } from '~/store/NotificationStore'
import { PersistentApiStore } from '~/store/main'

const itemList = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>) => {
  const router = useRouter()

  const filterOptions: HydraGetRequestFilter = reactive({
    sortBy: [],
    sortDesc: [],
    page: 1,
    itemsPerPage: 15,
    totalItems: 0
  })

  const filters: Ref<{ [key: string]: string }> = ref({})

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
    let params: HydraGetRequestFilter & { [key: string]: string } = {
      ...filters.value
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
    filters.value = {}
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
    if (location) {
      router.push(location)
    }
  }

  const deleteHandler = (item: U) => {
    store.del(item).then(() => onUpdateOptions(filterOptions))
  }

  return reactive({
    filterOptions,
    filters,
    resetFilter,
    addHandler,
    editHandler,
    deleteHandler,
    onUpdateOptions,
    onSendFilter
  })
}

export default itemList
