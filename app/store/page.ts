import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { PageCategory } from '~/store/page-category'
import { HydraMemberObject } from '~/types/hydra'
import { MediaNode } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'

export interface Page extends HydraMemberObject {
  url: string,
  title: string,
  content: string,
  isPublished: boolean,
  category: PageCategory,
  showInMenu: boolean,
  mediaNode: MediaNode | null,
}

interface PageState extends CrudState<Page>{
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
