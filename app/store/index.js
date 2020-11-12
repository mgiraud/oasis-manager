import { call } from "../util/api";

export const actions = {
    async nuxtClientInit({ commit }) {
        await call('/me').then((response) => {
            commit('member/setAuth', response.ok)
        })
    }
}