import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
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

interface PageCategoryState extends CrudState<PageCategory> {
  resource: string
}

export const usePageCategoryStore = defineStore('page_category', {
  state: (): PageCategoryState => {
    return {
      resource: '/page_categories',
      ...crudState
    }
  }
})
