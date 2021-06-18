import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export type MediaObject = HydraMemberObject & {
  contentUrl: string
  filePath: string
  uniqueId: string
  isImage: boolean,
  customName?: string
}

export default makeCrudModule({
  resource: 'media_objects'
})
