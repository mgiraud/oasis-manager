import { call } from '../util/api';

export const state = () => {
    return {
        auth: false
    }
}
export const mutations = {
    setAuth (state, auth) {
        state.auth = auth
    }
}
export const actions = {
    login ({ commit }, credentials) {
        return call('/login_check', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then((response) => {
            commit('setAuth', response.ok)
        })
    },
    logout ({ commit }) {
        return call('/logout', {
            method: 'GET',
        }).then(() => {
            commit('setAuth', null)
        })
    },
}