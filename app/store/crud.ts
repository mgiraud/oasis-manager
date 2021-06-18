import Vue from 'vue'
import remove from 'lodash/remove'
import { Store } from 'vuex'
import type { GetterTree, ActionTree, MutationTree, Commit } from 'vuex'
import { filter } from 'lodash'
import SubmissionError from '../error/SubmissionError'
import type { RootState } from './index'
import { HydraMemberObject, HydraObject, HydraView } from '~/api/hydra'

export interface CrudState {
  allIds: string[];
  byId: {[id: string] : HydraMemberObject};
  created: string | null;
  deleted: string | null,
  error: string;
  isLoading: boolean,
  resetList: boolean;
  selectItems: [HydraObject] | null,
  totalItems: number,
  updated: [HydraObject] | null,
  view: HydraView | null,
  violations: string[] | null,
  activeSlug: HydraObject | null
}

const handleError = (commit: Commit, e: Error) => {
  commit(MUTATIONS.TOGGLE_LOADING)
  if (e instanceof SubmissionError) {
    commit(MUTATIONS.SET_VIOLATIONS, e.errors)
    // eslint-disable-next-line
        commit(MUTATIONS.SET_ERROR, e.errors._error);

    return Promise.reject(e)
  }
  // eslint-disable-next-line
    commit(MUTATIONS.SET_ERROR, e.message);

  return Promise.reject(e)
}

export const MUTATIONS = {
  ADD: 'ADD',
  RESET_CREATE: 'RESET_CREATE',
  RESET_DELETE: 'RESET_DELETE',
  RESET_LIST: 'RESET_LIST',
  RESET_SHOW: 'RESET_SHOW',
  RESET_UPDATE: 'RESET_UPDATE',
  SET_CREATED: 'SET_CREATED',
  SET_DELETED: 'SET_DELETED',
  SET_ERROR: 'SET_ERROR',
  SET_SELECT_ITEMS: 'SET_SELECT_ITEMS',
  SET_TOTAL_ITEMS: 'SET_TOTAL_ITEMS',
  SET_UPDATED: 'SET_UPDATED',
  SET_VIEW: 'SET_VIEW',
  SET_VIOLATIONS: 'SET_VIOLATIONS',
  TOGGLE_LOADING: 'TOGGLE_LOADING'
}

export default function makeCrudModule ({
  normalizeRelations = (x: HydraMemberObject) => x,
  resolveRelations = (x: HydraMemberObject) => x,
  additionalState = {},
  additionalActions = ((store) => {}) as (store: Store<any>) => ActionTree<CrudState, RootState>,
  resource = ''
} = {}) {
  const crudState : CrudState = {
    allIds: [],
    byId: {},
    created: null,
    deleted: null,
    error: '',
    isLoading: false,
    resetList: false,
    selectItems: null,
    totalItems: 0,
    updated: null,
    view: null,
    violations: null,
    activeSlug: null
  }

  const mutations: MutationTree<CrudState> = {
    [MUTATIONS.ADD]: (state, item) => {
      Vue.set(state.byId, item['@id'], item)
      Vue.set(state, 'isLoading', false)
      if (state.allIds.includes(item['@id'])) {
        return
      }
      state.allIds.push(item['@id'])
    },
    [MUTATIONS.RESET_CREATE]: (state) => {
      Object.assign(state, {
        isLoading: false,
        error: '',
        created: null,
        violations: null
      })
    },
    [MUTATIONS.RESET_DELETE]: (state) => {
      Object.assign(state, {
        isLoading: false,
        error: '',
        deleted: null
      })
    },
    [MUTATIONS.RESET_LIST]: (state) => {
      Object.assign(state, {
        allIds: [],
        byId: {},
        error: '',
        isLoading: false,
        resetList: false
      })
    },
    [MUTATIONS.RESET_SHOW]: (state) => {
      Object.assign(state, {
        error: '',
        isLoading: false
      })
    },
    [MUTATIONS.RESET_UPDATE]: (state) => {
      Object.assign(state, {
        error: '',
        isLoading: false,
        updated: null,
        violations: null
      })
    },
    [MUTATIONS.SET_CREATED]: (state, created) => {
      Object.assign(state, { created })
    },
    [MUTATIONS.SET_DELETED]: (state, deleted) => {
      if (!state.allIds.includes(deleted['@id'])) {
        return
      }
      Object.assign(state, {
        byId: filter(state.byId, item => item['@id'] === deleted['@id']),
        allIds: remove(state.allIds, (id: string) => id === deleted['@id']),
        deleted
      })
    },
    [MUTATIONS.SET_ERROR]: (state, error) => {
      Object.assign(state, { error, isLoading: false })
    },
    [MUTATIONS.SET_SELECT_ITEMS]: (state, selectItems) => {
      Object.assign(state, {
        error: '',
        isLoading: false,
        selectItems
      })
    },
    [MUTATIONS.SET_TOTAL_ITEMS]: (state, totalItems) => {
      Object.assign(state, { totalItems })
    },
    [MUTATIONS.SET_UPDATED]: (state, updated) => {
      Vue.set(state, 'updated', updated)
      Vue.set(state.byId, updated['@id'], updated)
    },
    [MUTATIONS.SET_VIEW]: (state, view) => {
      Object.assign(state, { view })
    },
    [MUTATIONS.SET_VIOLATIONS]: (state, violations) => {
      Object.assign(state, { violations })
    },
    [MUTATIONS.TOGGLE_LOADING]: (state) => {
      Object.assign(state, { error: '', isLoading: !state.isLoading })
    }
  }

  const actions: ActionTree<CrudState, RootState> = {
    async create ({ commit }, values) {
      commit(MUTATIONS.SET_ERROR, '')
      commit(MUTATIONS.SET_VIOLATIONS, null)
      commit(MUTATIONS.TOGGLE_LOADING)

      try {
        // @ts-ignore
        const item = await this.$getRepository(resource).$create(values)
        commit(MUTATIONS.TOGGLE_LOADING)
        commit(MUTATIONS.ADD, item)
        commit(MUTATIONS.SET_CREATED, item)
        return item
      } catch (e) {
        await handleError(commit, e)
      }
    },
    async del ({ commit }, item) {
      commit(MUTATIONS.TOGGLE_LOADING)

      try {
        // @ts-ignore
        await this.$getRepository(resource).$remove(item)
        commit(MUTATIONS.TOGGLE_LOADING)
        commit(MUTATIONS.SET_DELETED, item)
      } catch (e) {
        await handleError(commit, e)
      }
    },
    async fetchAll ({ commit, state }, params) {
      // @ts-ignore
      if (!this.$getRepository(resource)) {
        throw new Error(`Repository ${resource} does not exist`)
      }

      commit(MUTATIONS.TOGGLE_LOADING)

      try {
        // @ts-ignore
        const retrieved = await this.$getRepository(resource).$findAll({ params })
        commit(MUTATIONS.TOGGLE_LOADING)

        commit(
          MUTATIONS.SET_TOTAL_ITEMS,
          retrieved['hydra:totalItems']
        )
        commit(MUTATIONS.SET_VIEW, retrieved['hydra:view'])

        if (state.resetList) {
          commit(MUTATIONS.RESET_LIST)
        }

        (retrieved['hydra:member'] as HydraMemberObject[]).forEach((item) => {
          commit(MUTATIONS.ADD, normalizeRelations(item))
        })
        return retrieved
      } catch (e) {
        await handleError(commit, e)
      }
    },
    async fetchSelectItems (
      { commit },
      { params = { properties: ['@id', 'name'] } } = {}
    ) {
      commit(MUTATIONS.TOGGLE_LOADING)

      // @ts-ignore
      if (!this.$getRepository(resource)) {
        throw new Error(`Repository ${resource} does not exist`)
      }

      try {
        // @ts-ignore
        const retrieved = await this.$getRepository(resource).$findAll({ params })
        commit(
          MUTATIONS.SET_SELECT_ITEMS,
          retrieved['hydra:member']
        )
        return retrieved
      } catch (e) {
        await handleError(commit, e)
      }
    },
    async load ({ commit }, id) {
      // @ts-ignore
      if (!this.$getRepository(resource)) {
        throw new Error(`Repository ${resource} does not exist`)
      }

      commit(MUTATIONS.TOGGLE_LOADING)
      try {
        // @ts-ignore
        const item = await this.$getRepository(resource).$find(id)
        commit(MUTATIONS.TOGGLE_LOADING)
        commit(MUTATIONS.ADD, normalizeRelations(item))
        return item
      } catch (e) {
        await handleError(commit, e)
      }
    },
    resetList: ({ commit }) => {
      commit(MUTATIONS.RESET_LIST)
    },
    resetCreate: ({ commit }) => {
      commit(MUTATIONS.RESET_CREATE)
    },
    resetDelete: ({ commit }) => {
      commit(MUTATIONS.RESET_DELETE)
    },
    resetShow: ({ commit }) => {
      commit(MUTATIONS.RESET_SHOW)
    },
    resetUpdate: ({ commit }) => {
      commit(MUTATIONS.RESET_UPDATE)
    },
    async update ({ commit }, item) {
      commit(MUTATIONS.SET_ERROR, '')
      commit(MUTATIONS.SET_VIOLATIONS, null)
      commit(MUTATIONS.TOGGLE_LOADING)

      try {
        // @ts-ignore
        const data = await this.$getRepository(resource).$update(item)
        commit(MUTATIONS.TOGGLE_LOADING)
        commit(MUTATIONS.SET_UPDATED, data)
      } catch (e) {
        await handleError(commit, e)
      }
    }
  }
  const getters: GetterTree<CrudState, RootState> = {
    find: state => (id: string | number) => {
      return resolveRelations(state.byId[id])
    },
    list: (state, getters) => {
      return state.allIds.map(id => getters.find(id))
    }
  }

  return {
    mutations,
    actions,
    getters,
    namespaced: true,
    state: () => ({ ...crudState, ...additionalState })
  }
}
