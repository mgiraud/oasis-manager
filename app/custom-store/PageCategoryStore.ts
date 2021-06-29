import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/custom-store/AbstractStore'
import { Page } from '~/custom-store/PageStore'

export interface PageCategory extends HydraMemberObject {
  id: number
  name: string
  showInMenu: boolean
  pages: Page[]
  slug: string
  isPublished: boolean
}

interface PageCategoryState extends CrudState<PageCategory> {
}

class PageCategoryStore extends PersistentApiStore<PageCategoryState, PageCategory> {
  getAddLocation (): RawLocation | null {
    return { name: 'admin-page-category-new' }
  }

  getEditLocation (item: PageCategory): RawLocation | null {
    return {
      name: 'admin-page-category-id',
      params: {
        id: item.id.toString()
      }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-page-category' }
  }

  listRole = 'USER_CAN_ACCESS_PAGE_CATEGORIES'
  editRole = 'USER_CAN_EDIT_PAGE_CATEGORIES'
  deleteRole = 'USER_CAN_DELETE_PAGE_CATEGORIES'
}

export const pageCategoryStore = new PageCategoryStore('page_categories')
