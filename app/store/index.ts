import type { ActionTree } from 'vuex'
import { Member } from '~/store/member'

export type Storage = {
  user: Member | null
}

export interface RootState {
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ dispatch }, { $auth }) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // Load page categories for menu rendering
    try {
      await dispatch('page/fetchAll')
    } catch (e) {
      $auth.reset()
    }
  }
}
