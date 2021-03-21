import makeCrudModule from './crud'
import { Page } from './page'
import { HydraMemberObject } from '~/api/hydra'

export type PageCategory = HydraMemberObject & {
  'name': string;
  'showInMenu': boolean;
  'pages': Page[];
  'slug': string;
  'isPublished': boolean;
}

export default makeCrudModule({
  resource: 'page_categories'
})
