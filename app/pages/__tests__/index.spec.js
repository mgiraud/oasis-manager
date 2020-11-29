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

const storage = {
  data : {},
  setUniversal(key, value) {
    this.data[key] = value
  },
  getUniversal(key) {
    return this.data[key]
  }
}

const factory = () => {
  return shallowMount(Index, {
    store,
    stubs: {
      NuxtLink: true,
    },
    localVue,
    vuetify: new Vuetify()
  })
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

  afterEach(() => {
    wrapper.destroy()
  })

  test('mounts properly', () => {
    wrapper = factory()
    expect(wrapper.vm).toBeTruthy()
  })

  test('displays Login message', () => {
    wrapper = factory()
    expect(wrapper.text()).toContain('login')
  })

  test('displays You are logged in message', async () => {
    await store.dispatch('security/login', {email: 'test@email.com', password: '123456'})
    store.state.storage = {
      user: MeData
    }
    wrapper = factory()
    expect(wrapper.text()).toContain('You are logged in')
  })
})
