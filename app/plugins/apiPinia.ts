import { PiniaPluginContext } from 'pinia'
import { CRUD_MODE, CrudState } from '~/store/crud'
import { Page } from '~/store/page'
import { HydraGetRequestFilter, HydraMemberObject } from '~/types/hydra'
import SubmissionError from '~~/nuxt-v2/app/error/SubmissionError'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> extends CrudState<HydraMemberObject>{
  }
}

function piniaApiPlugin({ store }: PiniaPluginContext) {
  store.load = async (id: string, params = {}) => {
    store.$state[CRUD_MODE.EDITION] = Object.assign({
      ...store.$state[CRUD_MODE.EDITION],
    })
    store.toggleLoading(CRUD_MODE.EDITION)
    store.$state[CRUD_MODE.EDITION].retrieved = await store.$nuxt.$apiFetch(`${store.resource}/${id}`, {
      params
    }).catch(async (e: Error) => {
      await store.handleError(CRUD_MODE.EDITION, e)
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.EDITION)
    })
  }

  store.fetchAll = async (params: HydraGetRequestFilter | Object = {}, reset: boolean = true) => {
    store.$state[CRUD_MODE.LIST] = Object.assign({
      ...store.$state[CRUD_MODE.LIST],
    })
    store.toggleLoading(CRUD_MODE.LIST)
    if (reset) {
      store.resetList()
    }
    const data = await store.$nuxt.$apiFetch(store.resource, {
      params
    }).catch(async (e: Error) => {
      await store.handleError(CRUD_MODE.LIST, e)
    })
    if (!data) {
      return;
    }
    data['hydra:member'].forEach((item: Page) => {
      store.addItem(item, store)
    })

    store.$state[CRUD_MODE.LIST].totalItems = data['hydra:totalItems']
    store.$state[CRUD_MODE.LIST].view = data['hydra:view']
    store.toggleLoading(CRUD_MODE.LIST)

    return store.list
  }

  store.resetList = () => {
    store.$state[CRUD_MODE.LIST].allIds = []
    store.$state[CRUD_MODE.LIST].byId = {}
  }

  store.addItem = (item: Page) => {
    store.$state[CRUD_MODE.LIST].allIds.push(item['@id'])
    store.$state[CRUD_MODE.LIST].byId[item['@id']] = item
  }

  store.find = (id: string | number): HydraMemberObject|null => {
    return store.$state[CRUD_MODE.LIST].byId[id] ?? null
  }

  store.toggleLoading = (mode: CRUD_MODE) => {
    store.$state[mode].isLoading = !store.$state[mode].isLoading;
  }

  store.handleError = (mode: CRUD_MODE, e: Error) => {
    if (mode !== CRUD_MODE.EDITION && mode !== CRUD_MODE.CREATION) {
      return;
    }

    if (e instanceof SubmissionError) {
      store.$state[mode].violations = e.errors
      store.$state[mode].error = e.errors._error

      return Promise.reject(e)
    }
    store.$state[mode].error = e.message

    return Promise.reject(e)
  }

  store.update = async (id: string | number, item: Page) => {
    store.$state[CRUD_MODE.EDITION] = Object.assign({
      ...store.$state[CRUD_MODE.EDITION],
    })
    store.$state[CRUD_MODE.EDITION].error = ''
    store.$state[CRUD_MODE.EDITION].violations = null
    store.toggleLoading(CRUD_MODE.EDITION)

    return await store.$nuxt.$apiFetch(`${store.resource}/${id}`, {
      method: 'PUT',
      body: item
    }).catch(async (e: Error) => {
      await store.handleError(CRUD_MODE.EDITION, e)
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.EDITION)
    })
  }

  store.create = async(values: Object) => {
    store.$state[CRUD_MODE.CREATION].error = ''
    store.$state[CRUD_MODE.CREATION].violations = null
    store.toggleLoading(CRUD_MODE.CREATION)

    store.$state[CRUD_MODE.CREATION].created = await store.$nuxt.$apiFetch(`${store.resource}`, {
      method: 'POST',
      body: values
    }).catch(async (e: Error) => {
      await store.handleError(CRUD_MODE.CREATION, e)
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.CREATION)
    })
  }

  store.del = async (item: Page) => {
    store.toggleLoading(CRUD_MODE.DELETION)
    store.$state[CRUD_MODE.DELETION].deleted = await store.$nuxt.$apiFetch(`${store.resource}/${item['url']}`, {
      method: 'DELETE',
    }).catch(async (e: Error) => {
      await store.handleError(CRUD_MODE.DELETION, e)
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.DELETION)
    })
  }

  store.fetchSelectItems = async ({ params = { 'properties[]': ['name'] } } = {}) => {
    store.$state[CRUD_MODE.SELECTION] = Object.assign({
      ...store.$state[CRUD_MODE.SELECTION],
    })
    store.toggleLoading(CRUD_MODE.SELECTION)
    const res = await store.$nuxt.$apiFetch(store.resource, {
      params
    }).catch(async (e: Error) => {
      await store.handleError(CRUD_MODE.SELECTION, e)
    }).finally(() => {
      store.toggleLoading(CRUD_MODE.SELECTION)
    })
    if (!res) {
      return;
    }
    store.$state[CRUD_MODE.SELECTION].selectItems = res['hydra:member']
  }

  store.selectItemList = computed(() =>
    (valueExpr = '@id', labelExpr = 'name') => {
      const items = store.$state[CRUD_MODE.SELECTION].selectItems.map(item => {
        return {
          value: item[valueExpr],
          label: item[labelExpr]
        }
      })
      items.unshift({
        value: null,
        label: 'Aucune catégorie'
      })

      return items
    }
  )

  store.list = computed(() => {
    return store.$state[CRUD_MODE.LIST].allIds.map((id: string) => store.$state[CRUD_MODE.LIST].byId[id])
  })
}

export default defineNuxtPlugin(({$pinia}) => {
  $pinia.use(piniaApiPlugin)
})
