import { call } from '../util/api';

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

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
    nuxtServerInit ({ commit }, { req }) {
        let auth = false
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = parsed.BEARER
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setAuth', auth)
    },
    login ({ commit }, credentials) {
        return call('/login_check', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then((response) => {
            if (response.ok) {
                commit('setAuth', true)
            }
            Cookie.set('auth', response.ok)
        })
    }
}