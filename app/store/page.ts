import { defineStore } from 'pinia'
import { CRUD_MODE, crudState, CrudState } from '~/store/crud'
import { HydraGetRequestFilter, HydraMemberObject } from '~/types/hydra'
import { MediaNode } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'
import { PageCategory } from '~~/nuxt-v2/app/custom-store/PageCategoryStore'
import SubmissionError from '~~/nuxt-v2/app/error/SubmissionError'

export type Page = HydraMemberObject & {
  'url': string;
  'title': string;
  'content': string;
  'isPublished': boolean;
  'category': PageCategory;
  'showInMenu': boolean;
  'mediaNode': MediaNode | null;
}

interface PageState extends CrudState<Page>{
}

export const usePageStore = defineStore('page', {
  state: (): PageState => {
    return {
      ...crudState,
    }
  },
  actions: {
    async fetchAll (params: HydraGetRequestFilter | Object = {}) {
      this.toggleLoading(CRUD_MODE.LIST)
      const pages = await this.$nuxt.$apiFetch('/pages').catch(async (e: Error) => {
        await this.handleError(CRUD_MODE.LIST, e)
      })
      if (!pages) {
        return;
      }
      this.resetList()

      pages['hydra:member'].forEach((item: Page) => {
        this.addItem(item)
      })
      this[CRUD_MODE.LIST].totalItems = pages['hydra:totalItems']
      this[CRUD_MODE.LIST].view = pages['hydra:view']
      this.toggleLoading(CRUD_MODE.LIST)

      return this.list
    },
    resetList() {
      this[CRUD_MODE.LIST].allIds = []
      this[CRUD_MODE.LIST].byId = {}
    },
    addItem(item: Page) {
      this[CRUD_MODE.LIST].allIds.push(item['@id'])
      this[CRUD_MODE.LIST].byId[item['@id']] = item
    },

    find(id: string | number): Page|null {
      return this[CRUD_MODE.LIST].byId[id] ?? null
    },

    toggleLoading(mode: CRUD_MODE) {
      this[mode].isLoading = !this[mode].isLoading;
    },

    handleError (mode: CRUD_MODE, e: Error) {
      if (mode !== CRUD_MODE.EDITION && mode !== CRUD_MODE.CREATION) {
        return;
      }

      if (e instanceof SubmissionError) {
        this[mode].violations = e.errors
        this[mode].error = e.errors._error

        return Promise.reject(e)
      }
      this[mode].error = e.message

      return Promise.reject(e)
    },

    async load (id: string) {
      this.toggleLoading(CRUD_MODE.EDITION)
      this[CRUD_MODE.EDITION].retrieved = await this.$nuxt.$apiFetch(`/pages/${id}`).catch(async (e: Error) => {
        await this.handleError(CRUD_MODE.EDITION, e)
      }).finally(() => {
        this.toggleLoading(CRUD_MODE.EDITION)
      })
    },

    async update (item: Page) {
      this[CRUD_MODE.EDITION].error = ''
      this[CRUD_MODE.EDITION].violations = null
      this.toggleLoading(CRUD_MODE.EDITION)

      return await this.$nuxt.$apiFetch(`/pages/${item['url']}`, {
        method: 'PUT',
        body: item
      }).catch(async (e: Error) => {
        await this.handleError(CRUD_MODE.EDITION, e)
      }).finally(() => {
        this.toggleLoading(CRUD_MODE.EDITION)
      })
    },

    async create (values: Object) {
      this[CRUD_MODE.CREATION].error = ''
      this[CRUD_MODE.CREATION].violations = null
      this.toggleLoading(CRUD_MODE.CREATION)

      this[CRUD_MODE.CREATION].created = await this.$nuxt.$apiFetch(`/pages`, {
        method: 'POST',
        body: values
      }).catch(async (e: Error) => {
        await this.handleError(CRUD_MODE.CREATION, e)
      }).finally(() => {
        this.toggleLoading(CRUD_MODE.CREATION)
      })
    },

    async del (item: Page) {
      this.toggleLoading(CRUD_MODE.DELETION)
      this[CRUD_MODE.DELETION].deleted = await this.$nuxt.$apiFetch(`/pages/${item['url']}`, {
        method: 'DELETE',
      }).catch(async (e: Error) => {
        await this.handleError(CRUD_MODE.DELETION, e)
      }).finally(() => {
        this.toggleLoading(CRUD_MODE.DELETION)
      })
    },

    async fetchSelectItems (resource: string, { params = { properties: ['@id', 'name'] } } = {}) {
      this.toggleLoading(CRUD_MODE.SELECTION)
      this[CRUD_MODE.SELECTION].selectItems = await this.$nuxt.$apiFetch(resource, {
        params
      }).catch(async (e: Error) => {
        await this.handleError(CRUD_MODE.SELECTION, e)
      }).finally(() => {
        this.toggleLoading(CRUD_MODE.SELECTION)
      })
    },
    //-----------------------------------------------------------------//
    findBySlug(slug: string) {
      return this.list.find((page: Page) => page.url === slug)
    }
  },
  getters: {
    list (state): Page[] {
      return state[CRUD_MODE.LIST].allIds.map((id: string) => state[CRUD_MODE.LIST].byId[id])
    },
  }
})
