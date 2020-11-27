import _ from "lodash"
import Vuex from "vuex"
import { createLocalVue } from "@vue/test-utils"
import createRepository from '~/api/repository'
import PageFetchAllData from './fixture/pages-fetchAll'

describe("store/page", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let NuxtStore
    let store
    let pageRepository = {
        $create() {
            return {};
        },
        $delete() {
            return {};
        },
        $findAll() {
            return PageFetchAllData;
        },
        $update() {
            return {};
        },
        $find() {
            return {};
        }
    }

    beforeAll(async () => {
        // note the store will mutate across tests
        const storePath = `${process.env.buildDir}/store.js`
        NuxtStore = await import(storePath)
    })

    beforeEach(async () => {
        Vuex.Store.prototype.$getRepository = jest.fn().mockReturnValue(pageRepository)
        store = await NuxtStore.createStore()
    })

    describe("FetchAll", () => {
        let pages;

        beforeEach( async () => {
            await store.dispatch('page/fetchAll')
            pages = store.getters['page/list']
        })

        test("getter is a function", () => {
            expect(_.isArray(pages)).toBe(true)
        })

        test("should be 6 movies total", () => {
            expect(pages.length).toBe(3)
            expect(store.state.page.totalItems).toBe(3)
        })
    })
})