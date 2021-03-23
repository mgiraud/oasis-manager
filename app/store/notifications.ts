import Vue from 'vue'
import type { ActionTree, MutationTree } from 'vuex'
import { RootState } from '.'

export type NotificationState = {
    show: boolean
    color: string
    text: string
    subText: string
    timeout: number
}

export const MUTATIONS = {
  SET_SHOW: 'SET_SHOW',
  SET_COLOR: 'SET_COLOR',
  SET_TEXT: 'SET_TEXT',
  SET_SUBTEXT: 'SET_SUBTEXT',
  SET_TIMEOUT: 'SET_TIMEOUT'
}

export const state = (): NotificationState => ({
  show: false,
  color: 'error',
  text: 'An error occurred',
  subText: '',
  timeout: 10000
})

export const mutations: MutationTree<NotificationState> = {
  [MUTATIONS.SET_SHOW]: (state, show: boolean) => {
    Vue.set(state, 'show', show)
  },
  [MUTATIONS.SET_COLOR]: (state, color: string) => {
    Vue.set(state, 'color', color)
  },
  [MUTATIONS.SET_TEXT]: (state, text: string) => {
    Vue.set(state, 'text', text)
  },
  [MUTATIONS.SET_SUBTEXT]: (state, subText: string) => {
    Vue.set(state, 'subText', subText)
  },
  [MUTATIONS.SET_TIMEOUT]: (state, timeout: number) => {
    Vue.set(state, 'timeout', timeout)
  }
}

export const actions: ActionTree<NotificationState, RootState> = {
  setShow ({ commit }, show) {
    commit(MUTATIONS.SET_SHOW, show)
  },
  setColor ({ commit }, color) {
    commit(MUTATIONS.SET_COLOR, color)
  },
  setText ({ commit }, text) {
    commit(MUTATIONS.SET_TEXT, text)
  },
  setSubText ({ commit }, subText) {
    commit(MUTATIONS.SET_SHOW, subText)
  },
  setTimeout ({ commit }, timeout) {
    commit(MUTATIONS.SET_TIMEOUT, timeout)
  }
}
