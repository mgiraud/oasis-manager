import makeCrudModule from './crud'
import { Member } from './member'
import { HydraMemberObject } from '~/api/hydra'
import { MediaNode } from '~/store/media_node'

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
    mediaNode: MediaNode
  }
