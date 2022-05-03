import { defineStore } from 'pinia'
import { crudState } from '~/store/crud'
import { Page } from '~/store/page'
import { HydraMemberObject } from '~/types/hydra'

export interface PageCategory extends HydraMemberObject {
  id: number
  name: string
  showInMenu: boolean
  pages: Page[]
  slug: string
  isPublished: boolean
}

interface PageCategoryState {
  resource: string
}

export const usePageStore = defineStore('page', {
  state: (): PageCategoryState => {
    return {
      resource: '/page_categories',
      ...crudState
    }
  }
})
