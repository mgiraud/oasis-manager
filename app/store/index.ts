import type { ActionTree } from 'vuex'
import { Member } from '~/store/member'

export type Storage = {
  user: Member | null
}

export interface RootState {}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ dispatch }) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // Load page categories for menu rendering
    await dispatch('page/fetchAll')
  }
}
