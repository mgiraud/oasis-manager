import makeCrudModule from './crud'
import { MemberGroup } from './member_group'
import { HydraMemberObject } from '~/api/hydra'

export type Member = HydraMemberObject & {
  id: number
  email: string
  nickname: string
  permissions: string[]
  memberPermissions: string[]
  groupPermissionsOverrideType: number
  groups: MemberGroup[]
  isAdmin: boolean
}

export default makeCrudModule({
  resource: 'members'
})
