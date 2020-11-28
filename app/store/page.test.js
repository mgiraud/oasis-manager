import _ from "lodash"
import Vuex from "vuex"
import { createLocalVue } from "@vue/test-utils"
import PageFetchAllData from './fixture/pages-fetchAll'
import PageFetchOneData from './fixture/pages-fetch'

describe("store/page", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let NuxtStore
    let store
    let pageRepository = {
        $create(data) {
            data = {
                ...data,
                ... {
                    '@context': '/api/contexts/Page',
                    '@id': '/api/pages/toui',
                    '@type': 'Page',
                }
            }
            return data;
        },
        $delete() {
            return {};
        },
        $findAll() {
            return PageFetchAllData;
        },
        $update(data) {
            return data;
        },
        $find() {
            return PageFetchOneData;
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

    afterEach(() => {
        store.commit('page/RESET_LIST')
    });

    describe("FetchAll", () => {
        let pages;

        beforeEach( async () => {
            await store.dispatch('page/fetchAll')
            pages = store.getters['page/list']
        })

        test("getter is a function", () => {
            expect(_.isArray(pages)).toBe(true)
        })

        test("The list of page should be an array", () => {
            expect(pages.length).toBe(3)
            expect(store.state.page.totalItems).toBe(3)
        })

        test("Reset list makes it empty", () => {
            store.commit('page/RESET_LIST')
            pages = store.getters['page/list']
            expect(pages).toStrictEqual([])
        })
    })

    describe("FetchSelectItems", () => {
        let pages;

        beforeEach( async () => {
            await store.dispatch('page/fetchSelectItems')
            pages = store.state.page.selectItems
        })

        test("the selectItems data should be an array", () => {
            expect(_.isArray(pages)).toBe(true)
        })

        test("should be 3 selected pages total", () => {
            expect(pages.length).toBe(3)
        })
    })

    describe("Load", () => {
        let page;

        beforeEach( async () => {
            page = await store.dispatch('page/load', 'toui')
        })

        test("getter is a function", () => {
            expect(_.isObject(page)).toBe(true)
        })

        test("The id matches the one from the loaded page", () => {
            expect(page['@id']).toBe('/api/pages/toui')
        })
    })

    describe("Delete", () => {
        let pageToDelete;

        beforeEach( async () => {
            await store.dispatch('page/fetchAll')
            pageToDelete = (store.getters['page/find'])('/api/pages/toui')
            await store.dispatch('page/del', pageToDelete)
        })

        test("the deleted page is not found oin the list", () => {
            const getPage = store.getters['page/find']
            expect(_.isUndefined(getPage('/api/pages/toui'))).toBe(true)
        })

        test("The deleted page is the one stored in the deleted data", () => {
            expect(store.state.page.deleted['@id']).toBe(pageToDelete['@id'])
        })

        test("Resetting the created makes it null", () => {
            store.dispatch('page/resetDelete')
            expect(store.state.page.deleted).toBe(null)
        })
    })

    describe("Create", () => {
        let page;

        beforeEach( async () => {
            await store.dispatch('page/fetchAll')
            page = await store.dispatch('page/create', {
                url: 'toui',
                title: 'toui',
                content: 'toui',
                createdAt: '2020-11-20T19:55:16+00:00',
                createdBy: '/api/members/4',
                isPublished: true,
                category: null,
                showInMenu: true
            })
        })

        afterEach(() => {
            store.commit('page/RESET_LIST')
        });

        test("Create uses $create repository", () => {
            expect(page['@id']).toBe('/api/pages/toui')
        })

        test("The created page is the one stored in the created data", () => {
            expect(store.state.page.created['@id'] ).toBe('/api/pages/toui')
        })

        test("Resetting the created makes it null", () => {
            store.dispatch('page/resetCreate')
            expect(store.state.page.created).toBe(null)
        })
    })

    describe("Update", () => {
        let pages;
        let updated

        beforeEach( async () => {
            await store.dispatch('page/fetchAll')
            pages = store.state.page.selectItems
            updated = (store.getters['page/find'])('/api/pages/toui')
            updated.content = 'HELLO'
            await store.dispatch('page/update', updated)
        })

        afterEach(() => {
            store.commit('page/RESET_LIST')
        });

        test("The updated page is the one stored in the updated data", () => {
            expect(store.state.page.updated['@id'] ).toBe('/api/pages/toui')
        })

        test("the update has updated data", () => {
            expect(store.state.page.updated.content ).toBe('HELLO')
        })

        test("Resetting the updated makes it null", () => {
            store.dispatch('page/resetUpdate')
            expect(store.state.page.updated).toBe(null)
        })
    })

    describe("Error, show, loading", () => {
        beforeEach( async () => {
            store.commit('page/SET_ERROR', 'this error')
            store.commit('page/SET_VIOLATIONS', ['this violation', 'that violation'])
        })

        test("error is stored", () => {
            expect(store.state.page.error).toBe('this error')
        })

        test("violations are stored", () => {
            expect(store.state.page.violations).toStrictEqual(['this violation', 'that violation'])
        })

        test("Reset show makes the error null", () => {
            store.dispatch('page/resetShow')
            expect(store.state.page.error).toBe('')
        })

        test("Resetting the updated makes it null", () => {
            store.commit('page/TOGGLE_LOADING')
            expect(store.state.page.error).toBe('')
            expect(store.state.page.isLoading).toBe(true)
        })
    })

    describe("Menu", () => {
        let menuItems

        beforeEach( async () => {
            await store.dispatch('page/fetchAll')
            menuItems = store.getters['page/menuItems']
        })

        test('The menu is correctly built', () => {
            expect(menuItems).toStrictEqual(    [
                { name: 'toui', url: 'toui' },
                { name: 'ze category is the best', slug: 'category', url: null }
            ])
        })

        test('can set an active slug', () => {
            store.commit('page/setActiveSlug', 'that slug')
            expect(store.state.page.activeSlug).toBe('that slug')
        })

        test('can font page by category slug', () => {
            store.commit('page/setActiveSlug', 'category')
            let getter = store.getters['page/findByActiveSlug']
            expect(getter.length).toBe(2)
        })
    })
})