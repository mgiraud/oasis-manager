import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { HydraMemberObject } from '~/types/hydra'

export interface PageLog extends HydraMemberObject {
  id: number;
  createdBy: string;
  createdAt: string;
  originalContent: string;
  isDraft: boolean;
}

interface PageLogState extends CrudState<PageLog> {
  resource: string
}

export const usePageLogStore = defineStore('page_logs', {
  state: (): PageLogState => {
    return {
      resource: '/page_logs',
      ...crudState
    }
  }
})
