import makeCrudModule from './crud'
import { Member } from './member'
import { HydraMemberObject } from '~/api/hydra'
import { MediaGalleryItem } from '~/store/media_gallery_item'

export default makeCrudModule({
  resource: 'blog_articles'
})

export type BlogArticle = HydraMemberObject & {
    'title': string;
    'content': string;
    'isPublished': boolean;
    'createdBy': Member;
    'tags': string[];
    'showInMenu': boolean;
    galleryItem: MediaGalleryItem
  }
