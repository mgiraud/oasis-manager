import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/AbstractStore'

export interface MediaObject extends HydraMemberObject {
  contentUrl: string
  filePath: string
  uniqueId: string
  isImage: boolean,
  customName?: string
}

interface MediaObjectState extends CrudState<MediaObject> {
}

class MediaObjectStore extends PersistentApiStore<MediaObjectState, MediaObject> {
  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: MediaObject): RawLocation | null {
    return null
  }

  getIdentifierFromUrlParam (param: string): string {
    return ''
  }

  getListLocation (): RawLocation | null {
    return null
  }

  deleteRole = 'USER_CAN_DELETE_MEDIA_OBJECTS'
  uploadRole = 'USER_CAN_UPLOAD_MEDIA_OBJECTS'
  editRole = 'USER_CAN_EDIT_MEDIA_OBJECTS'
  listRole = 'USER_CAN_ACCESS_GALLERIES'
}

export const mediaObjectStore = new MediaObjectStore('media_objects')
