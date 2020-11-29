import { createLocalVue } from '@vue/test-utils';
import Vue from "vue"
import Vuex from "vuex"
import Vuetify from 'vuetify'
import MeData from "./fixture/member-me-admin";

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)
let NuxtStore
let store

const storage = {
    data : {},
    setUniversal(key, value) {
        this.data[key] = value
    },
    getUniversal(key) {
        return this.data[key]
    },
}

describe('Index', () => {

    const memberRepository = {
        call() {

        },
        $find() {
            return MeData;
        }
    }

    beforeAll(async () => {
        const storePath = `${process.env.buildDir}/store.js`
        NuxtStore = await import(storePath)
    })

    beforeEach(async () => {
        Vuex.Store.prototype.$storage = storage
        Vuex.Store.prototype.$getRepository = jest.fn().mockReturnValue(memberRepository)
        store = await NuxtStore.createStore()
    })

    test('login the user and check is logged and admin', async () => {
        await store.dispatch('security/login', {email: 'test@email.com', password: '123456'})
        store.state.storage = {
            user: MeData
        }
        expect(storage.getUniversal('user')['@id']).toContain('/api/members/4')
        expect(store.state.security.credentialError).toBe(false)
        expect(store.getters['security/isAdmin']).toBe(true)
        expect(store.getters['security/isLoggedIn']).toBe(true)
    })

    test('login error', async () => {
        Vuex.Store.prototype.$getRepository = jest.fn().mockReturnValue({
            call() {
                throw Error('error')
            },
        })
        await store.dispatch('security/login', {email: 'test@email.com', password: '123456'})
        expect(storage.getUniversal('user')).toBe(null)
        expect(store.state.security.credentialError).toBe(true)
    })

    test('login then logout the user', async () => {
        await store.dispatch('security/login', {email: 'test@email.com', password: '123456'})
        await store.dispatch('security/logout')
        expect(storage.getUniversal('user')).toBe(null)
    })

    test('user has permissions', async () => {
        store.state.storage = {
            user: MeData
        }
        expect(store.getters['security/hasPermissions']([
            'USER_CAN_ACCESS_GALLERIES',
            'USER_CAN_EDIT_GALLERIES'
        ])).toBe(true)
    })
})
