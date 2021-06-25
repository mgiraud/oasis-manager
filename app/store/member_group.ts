import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export default makeCrudModule({
  resource: 'member_groups'
})
