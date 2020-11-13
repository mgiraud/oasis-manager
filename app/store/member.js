import { call } from '../util/api';

export const state = () => {
    return {
        auth: false,
    }
}
export const mutations = {
    setAuth (state, auth) {
        state.auth = auth
    },
    setUser (state, user) {
        state.user = user
    }
}
export const actions = {
    login ({ commit }, credentials) {
        return call('/login_check', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then((response) => {
            commit('setAuth', response.ok)
            if (!response.ok) {
                return;
            }
            call('/me').then((response) => {
                response.json().then((user) => {
                    this.$storage.setUniversal('user', user)
                })
            })
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

export const getters = {
    getRoles: (state, getters, rootState) =>  {
        const user = rootState.storage.user;
        return user ? user.roles : null
    },
    isAdmin: (state, getters, rootState) =>  {
        const user = rootState.storage.user;
        return user ? user.roles.indexOf('ROLE_ADMIN') !== -1 : false;
    }
}