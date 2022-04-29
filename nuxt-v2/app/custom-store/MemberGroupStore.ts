import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '../api/hydra'
import { CrudState, PersistentApiStore } from './AbstractStore'

export interface MemberGroup extends HydraMemberObject {
  name: string
  description: string
  permissions: string[]
  memberCount: number
}

interface MemberGroupState extends CrudState<MemberGroup> {
}

class MemberGroupStore extends PersistentApiStore<MemberGroupState, MemberGroup> {
  getAddLocation (): RawLocation | null {
    return { name: 'admin-member-group-new' }
  }

  getEditLocation (item: MemberGroup): RawLocation | null {
    return {
      name: 'admin-member-group-id',
      params: {
        id: item.name
      }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-member-group' }
  }

  listRole = 'USER_CAN_ACCESS_MEMBER_GROUPS'
  editRole = 'USER_CAN_EDIT_MEMBER_GROUPS'
  deleteRole = 'USER_CAN_DELETE_MEMBER_GROUPS'
}

export const memberGroupStore = new MemberGroupStore('member_groups')
