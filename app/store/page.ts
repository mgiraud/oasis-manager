import { defineStore } from 'pinia'
import { CRUD_MODE, crudState } from '~/store/crud'
import { HydraGetRequestFilter, HydraMemberObject } from '~/types/hydra'
import { MediaNode } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'
import { PageCategory } from '~~/nuxt-v2/app/custom-store/PageCategoryStore'

export type Page = HydraMemberObject & {
  url: string,
  title: string,
  content: string,
  isPublished: boolean,
  category: PageCategory,
  showInMenu: boolean,
  mediaNode: MediaNode | null,
}

interface PageState {
  resource: string
}

export const usePageStore = defineStore('page', {
  state: (): PageState => {
    return {
      resource: '/pages',
      ...crudState
    }
  },
  actions: {
    findBySlug(slug: string): Page|null {
      return this.list.find((page: Page) => page.url === slug)
    }
  },
})
