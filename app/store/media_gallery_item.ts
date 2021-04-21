import makeCrudModule from './crud'
import { MediaObject } from './media_object'
import { MediaGallery } from './media_gallery'
import { HydraMemberObject } from '~/api/hydra'

export type breadcrumbItem = {
  '@id': string
  name: string
  type: 'item' | 'gallery'
}

export type MediaGalleryItem = HydraMemberObject & {
  id: number
  name: string
  description: string
  gallery: MediaGallery
  children: MediaGalleryItem[]
  mediaObjects: MediaObject[]
  breadcrumb: breadcrumbItem[]
}

export default makeCrudModule({
  resource: 'media_gallery_items'
})
