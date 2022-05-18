import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { Page } from '~/store/page'
import { HydraMemberObject } from '~/types/hydra'
import { MediaNode, MediaNodeItem } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'

export interface MediaObject extends HydraMemberObject {
  contentUrl: string
  filePath: string
  uniqueId: string
  isImage: boolean,
  customName?: string,
  thumbnails: MediaObject[],
  original: MediaObject | null,
  // Next are used for carrousel
  index?: number,
  order?: number,
}

interface MediaObjectState extends CrudState<MediaObject>{
  resource: string,
}

export const useMediaObjectStore = defineStore('media_objects', {
  state: (): MediaObjectState => {
    return {
      resource: '/media_objects',
      ...crudState
    }
  },
  actions: {
    async generateThumbnails (mediaObject: MediaObject) {
      return await this.$nuxt.$apiFetch(`${this.resource}/${mediaObject.uniqueId}/thumbnail`, {
        method: 'POST',
        body: {}
      }).catch(async (e: Error) => {
        await this.handleError(e)
      })
    },
  }
})
