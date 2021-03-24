import type { ActionTree, Dispatch } from 'vuex'
import jwtDecode from 'jwt-decode'
import { Context } from '@nuxt/types'
import { Member } from '~/store/member'
const cookieparser = process.server ? require('cookieparser') : undefined

export type Storage = {
  user: Member | null
}

export interface RootState {
  storage: Storage
}

interface SecurityToken {
  iat: number,
  exp: number,
  roles: string[],
  username: string
}

// @ts-ignore
const logout = async ($storage, dispatch: Dispatch) => {
  // @ts-ignore
  $storage.syncUniversal('user', null)
  return await dispatch('security/logout')
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ dispatch }, ctx: Context) {
    // Load permissions list from file
    dispatch('security/loadPermissions')
    // Load page categories for menu rendering
    await dispatch('page/fetchAll')
    // // check if the user exists
    // if (ctx.req.headers.cookie) {
    //   const parsed = cookieparser.parse(ctx.req.headers.cookie)
    //   if (!parsed || !parsed.BEARER) {
    //     // @ts-ignore
    //     return logout(this.$storage, dispatch)
    //   } else {
    //     const decodedToken = jwtDecode(parsed.BEARER) as SecurityToken
    //     if (!decodedToken || decodedToken.exp < (Date.now() / 1000)) {
    //       // @ts-ignore
    //       return logout(this.$storage, dispatch)
    //     }
    //   }
    // }
    // // @ts-ignore
    // return logout(this.$storage, dispatch)
  }
}
