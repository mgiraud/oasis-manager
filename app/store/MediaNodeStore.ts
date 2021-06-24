import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'
import { breadcrumbItem } from '~/store/media_node'
import { MediaObject } from '~/store/media_object'

export type MediaNode = HydraMemberObject & {
  id: number
  name: string
  description: string
  children: MediaNode[]
  mediaObjects: MediaObject[]
  breadcrumb: breadcrumbItem[]
  parent?: string
}

interface MediaNodeState extends CrudState<MediaNode> {
}

class MediaNodeStore extends PersistentApiStore<MediaNodeState, MediaNode> {
  getAddLocation (): RawLocation | null {
    return null;
  }

  getEditLocation (item: MediaNode): RawLocation | null {
    return null;
  }

  getIdentifierFromUrlParam (param: string): string {
    return '';
  }

  getListLocation (): RawLocation | null {
    return null;
  }

}

export const mediaNodeStore = new MediaNodeStore('media_nodes')
