import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export type MediaGallery = HydraMemberObject & {
    id: number
  name: string
  description: string
  rootItem: string
}

export default makeCrudModule({
  resource: 'media_galleries'
})
