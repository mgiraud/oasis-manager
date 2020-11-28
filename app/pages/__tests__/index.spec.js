import { createLocalVue, shallowMount } from '@vue/test-utils';
import Index from '../'
import Vue from "vue"
import Vuex from "vuex"
import Vuetify from 'vuetify'
import MeData from "../../store/fixture/member-me-admin";

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)
let NuxtStore
let wrapper
let store

describe('Index', () => {
  const storage = {
    data : {},
    setUniversal(key, value) {
      this.data[key] = value
    },
    getUniversal(key) {
      return this.data[key]
    }
  }

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
    wrapper = shallowMount(Index, {
      store,
      stubs: {
        NuxtLink: true,
      },
      localVue,
      vuetify: new Vuetify()
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('mounts properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('displays Login message', () => {
    expect(wrapper.text()).toContain('login')
  })

  test('displays Admin message when admin', () => {
    store.dispatch('security/login', {email: 'test@email.com', password: '123456'})
    // expect(storage.getUniversal('user')['@id']).toContain('/api/members/4')
  })
})
