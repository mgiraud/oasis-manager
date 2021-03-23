import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export type ContactNewsletter = HydraMemberObject & {
  email: string,
  createdAt: string
}

export default makeCrudModule({
  resource: 'contact_newsletters'
})
