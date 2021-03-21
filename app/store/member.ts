import makeCrudModule from './crud'
import { MemberGroup } from './member_group'
import { HydraMemberObject } from '~/api/hydra'

export type Member = HydraMemberObject & {
  id: number
  email: string
  nickname: string
  permissions: string[]
  memberPermissions: string[]
  groupPermissionsOverrideType: 0
  groups: MemberGroup[]
  isAdmin: true
}

export default makeCrudModule({
  resource: 'members'
})
