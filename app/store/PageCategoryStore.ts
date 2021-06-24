import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'
import { Page } from '~/store/PageStore'

export interface PageCategory extends HydraMemberObject {
  'name': string;
  'showInMenu': boolean;
  'pages': Page[];
  'slug': string;
  'isPublished': boolean;
}

interface PageCategoryState extends CrudState<PageCategory> {
}

class PageCategoryStore extends PersistentApiStore<PageCategoryState, PageCategory> {

  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: PageCategory): RawLocation | null {
    return null
  }

  getListLocation (): RawLocation | null {
    return null
  }

  getIdentifierFromUrlParam (param: string): string {
    return `api/page_categories/${decodeURIComponent(param)}`;
  }
}

export const pageCategoryStore = new PageCategoryStore('page_categories')
