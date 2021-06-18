import { Commit } from 'vuex'
import Vue from 'vue'
import makeCrudModule, { CrudState } from './crud'
import { MediaObject } from './media_object'
import { HydraMemberObject } from '~/api/hydra'
import { Repository } from '~/api/repository'

export type breadcrumbItem = {
  '@id': string
  name: string
  type: 'item' | 'gallery'
}

export type MediaNode = HydraMemberObject & {
  id: number
  name: string
  description: string
  children: MediaNode[]
  mediaObjects: MediaObject[]
  breadcrumb: breadcrumbItem[]
  parent?: string
}

export type MediaNodeNew = {
  name: string
  parent: string
}

type MediaNodeModuleState = CrudState & {
  tree: MediaNode[] | null,
  treeIsLoading: boolean,
  resetTree: boolean,
  treeError: string,
  allTreeIds: string[]
  treeById: { [index: string]: MediaNode }
}

export type MediaNodeItem = {
  '@id': string
  name: string
  children: MediaNodeItem[]
}

const mediaNodeModule = makeCrudModule({
  resource: 'media_nodes',
  additionalState: {
    tree: null,
    allTreeIds: [],
    treeById: {},
    treeIsLoading: false,
    resetTree: false,
    treeError: ''
  }
})

const MUTATIONS = {
  TOGGLE_TREE_LOADING: 'TOGGLE_TREE_LOADING',
  RESET_TREE: 'RESET_TREE',
  TREE_ADD: 'TREE_ADD',
  SET_TREE_ERROR: 'SET_TREE_ERROR'
}

const handleError = (commit: Commit, e: Error) => {
  commit(MUTATIONS.SET_TREE_ERROR, e.message)
  return Promise.reject(e)
}

// @ts-ignore
mediaNodeModule.mutations[MUTATIONS.TOGGLE_TREE_LOADING] = (state: MediaNodeModuleState) => {
  Object.assign(state, { treeError: '', treeIsLoading: !state.treeIsLoading })
}

// @ts-ignore
mediaNodeModule.mutations[MUTATIONS.SET_TREE_ERROR] = (state: MediaNodeModuleState, treeError) => {
  Object.assign(state, { treeError, treeIsLoading: false })
}

// @ts-ignore
mediaNodeModule.mutations[MUTATIONS.TREE_ADD] = (state: MediaNodeModuleState, item) => {
  Vue.set(state.treeById, item['@id'], item)
  Vue.set(state, 'treeIsLoading', false)
  if (state.allTreeIds.includes(item['@id'])) {
    return
  }
  state.allTreeIds.push(item['@id'])
}

// @ts-ignore
mediaNodeModule.mutations[MUTATIONS.RESET_TREE] = (state: MediaNodeModuleState) => {
  Object.assign(state, {
    allTreeIds: [],
    treeById: {},
    error: '',
    treeIsLoading: false,
    resetTree: false
  })
}

// @ts-ignore
mediaNodeModule.actions.fetchTree = async ({
  commit,
  state
}: { commit: Commit, state: MediaNodeModuleState }, repository: Repository) => {
  commit(MUTATIONS.TOGGLE_TREE_LOADING)

  try {
    // @ts-ignore
    const retrieved = await repository.validateAndDecodeResponse('media_nodes/tree')
    commit(MUTATIONS.TOGGLE_TREE_LOADING)

    if (state.resetTree === true) {
      commit(MUTATIONS.RESET_TREE)
    }

    (retrieved['hydra:member'] as HydraMemberObject[]).forEach((item) => {
      commit(MUTATIONS.TREE_ADD, item)
    })
    return retrieved
  } catch (e) {
    await handleError(commit, e)
  }
}

// @ts-ignore
mediaNodeModule.getters.findTree = (state: MediaNodeModuleState) => (id: string | number) => {
  return state.treeById[id]
}

// @ts-ignore
mediaNodeModule.getters.tree = (state: MediaNodeModuleState, getters) => {
  const tree: MediaNodeItem[] = []
  state.allTreeIds.forEach((id) => {
    const node = getters.findTree(id)
    tree.push({
      '@id': node['@id'],
      children: node.children,
      name: node.name
    })
    return tree
  })

  return tree
}

// @ts-ignore
mediaNodeModule.getters.rootNodes = (state: MediaNodeModuleState, getters) => {
  return getters.list.filter((mediaNode: MediaNode) => !mediaNode.parent)
}

export default mediaNodeModule
