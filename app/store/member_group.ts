import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export type MemberGroup = HydraMemberObject & {
  name: string
  description: string
  permissions: string[]
  memberCount: number
}

export default makeCrudModule({
  resource: 'member_groups'
})
