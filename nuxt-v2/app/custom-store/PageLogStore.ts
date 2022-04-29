import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '../api/hydra'
import { CrudState, PersistentApiStore } from './AbstractStore'

export interface PageLog extends HydraMemberObject {
  id: number;
  createdBy: string;
  createdAt: string;
  originalContent: string;
  isDraft: boolean;
}

interface PageLogState extends CrudState<PageLog> {
}

class PageLogStore extends PersistentApiStore<PageLogState, PageLog> {
  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: PageLog): RawLocation | null {
    return null
  }

  getListLocation (): RawLocation | null {
    return null
  }

  getIdentifierFromUrlParam (param: string): string {
    return `api/page_logs/${decodeURIComponent(param)}`
  }

  deleteRole = ''
  editRole = ''
  listRole = ''
}

export const pageLogStore = new PageLogStore('page_logs')
