import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/AbstractStore'

export interface Member extends HydraMemberObject {
  id: number
  email: string
  nickname: string
  permissions: string[]
  memberPermissions: string[]
  groupPermissionsOverrideType: number
  groups: Member[]
  isAdmin: boolean
}

interface MemberState extends CrudState<Member> {
}

class MemberStore extends PersistentApiStore<MemberState, Member> {

  getAddLocation (): RawLocation | null {
    return { name: 'admin-member-new' }
  }

  getEditLocation (item: Member): RawLocation | null {
    return {
      name: 'admin-member-id',
      params: {
        id: item.id.toString()
      }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-member' }
  }

  listRole = 'USER_CAN_ACCESS_MEMBERS'
  editRole = 'USER_CAN_EDIT_MEMBERS'
  deleteRole = 'USER_CAN_DELETE_MEMBERS'
}

export const memberStore = new MemberStore('members')
