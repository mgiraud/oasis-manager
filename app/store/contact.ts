import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export type Contact = HydraMemberObject & {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  content: string
  subject: string
}

export default makeCrudModule({
  resource: 'contacts'
})
