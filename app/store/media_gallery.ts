import type { Commit } from 'vuex'
import Vue from 'vue'
import makeCrudModule, { CrudState } from './crud'
import { HydraMemberObject } from '~/api/hydra'
import { MediaGalleryItem } from '~/store/media_gallery_item'
import { Repository } from '~/api/repository'

export type MediaGallery = HydraMemberObject & {
  id: number
  name: string
  description: string
  rootItem: MediaGalleryItem
}

export type MediaGalleryTreeItem = {
  '@id': string
  name: string
  children: MediaGalleryItem[]
}

type MediaGalleryModuleState = CrudState & {
  tree: MediaGallery[] | null,
  treeIsLoading: boolean,
  resetTree: boolean,
  treeError: string,
  allTreeIds: string[]
  treeById: { [index: string]: MediaGallery }
}

const MUTATIONS = {
  TOGGLE_TREE_LOADING: 'TOGGLE_TREE_LOADING',
  RESET_TREE: 'RESET_TREE',
  TREE_ADD: 'TREE_ADD',
  SET_TREE_ERROR: 'SET_TREE_ERROR'
}

const mediaGalleryModule = makeCrudModule({
  resource: 'media_galleries',
  additionalState: {
    tree: null,
    allTreeIds: [],
    treeById: {},
    treeIsLoading: false,
    resetTree: false,
    treeError: ''
  }
})

const handleError = (commit: Commit, e: Error) => {
  commit(MUTATIONS.SET_TREE_ERROR, e.message)
  return Promise.reject(e)
}

// @ts-ignore
mediaGalleryModule.mutations[MUTATIONS.TOGGLE_TREE_LOADING] = (state: MediaGalleryModuleState) => {
  Object.assign(state, { treeError: '', treeIsLoading: !state.treeIsLoading })
}

// @ts-ignore
mediaGalleryModule.mutations[MUTATIONS.SET_TREE_ERROR] = (state: MediaGalleryModuleState, treeError) => {
  Object.assign(state, { treeError, treeIsLoading: false })
}

// @ts-ignore
mediaGalleryModule.mutations[MUTATIONS.TREE_ADD] = (state: MediaGalleryModuleState, item) => {
  Vue.set(state.treeById, item['@id'], item)
  Vue.set(state, 'treeIsLoading', false)
  if (state.allTreeIds.includes(item['@id'])) {
    return
  }
  state.allTreeIds.push(item['@id'])
}

// @ts-ignore
mediaGalleryModule.mutations[MUTATIONS.RESET_TREE] = (state: MediaGalleryModuleState) => {
  Object.assign(state, {
    allTreeIds: [],
    treeById: {},
    error: '',
    treeIsLoading: false,
    resetTree: false
  })
}

// @ts-ignore
mediaGalleryModule.actions.fetchTree = async ({
  commit,
  state
}: { commit: Commit, state: MediaGalleryModuleState }, repository: Repository) => {
  commit(MUTATIONS.TOGGLE_TREE_LOADING)

  try {
    // @ts-ignore
    const retrieved = await repository.validateAndDecodeResponse('media_galleries/tree')
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
mediaGalleryModule.getters.findTree = (state: MediaGalleryModuleState) => (id: string | number) => {
  return state.treeById[id]
}

// @ts-ignore
mediaGalleryModule.getters.tree = (state: MediaGalleryModuleState, getters) => {
  const tree: MediaGalleryTreeItem[] = []
  state.allTreeIds.forEach((id) => {
    const gallery = getters.findTree(id)
    tree.push({
      '@id': gallery.rootItem['@id'],
      children: gallery.rootItem.children,
      name: gallery.name
    })
    return tree
  })

  return tree
}

export default mediaGalleryModule
