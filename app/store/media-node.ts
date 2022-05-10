import { defineStore } from 'pinia'
import { crudState } from '~/store/crud'
import { MediaObject } from '~/store/media-object'
import { HydraMemberObject } from '~/types/hydra'

export interface MediaNode extends HydraMemberObject {
  id: number
  name: string
  description: string
  children: MediaNode[]
  mediaObjects: MediaObject[]
  breadcrumb: BreadcrumbItem[]
  parent?: string
}

export interface MediaNodeItem {
  '@id': string
  id: string | number
  name: string
  children: MediaNodeItem[]
}

export interface BreadcrumbItem {
  '@id': string
  name: string
  id: string | number
  type: 'item' | 'gallery'
}

interface MediaNodeState {
  resource: string,
  treeIsLoading: boolean,
  resetTree: boolean,
  treeError: string,
  allTreeIds: string[]
  treeById: { [index: string]: MediaNode }
}

export const useMediaNodeStore = defineStore('media_nodes', {
  state: (): MediaNodeState => {
    return {
      resource: '/media_nodes',
      allTreeIds: [],
      treeById: {},
      treeError: '',
      treeIsLoading: false,
      resetTree: false,
      ...crudState
    }
  },
  actions: {
    toggleTreeLoading () {
      this.treeIsLoading = !this.treeIsLoading
    },

    resetTree () {
      Object.assign(this, {
        allTreeIds: [],
        treeById: {},
        treeError: '',
        treeIsLoading: false,
        resetTree: false
      })
    },

    addTreeItem (item: MediaNode) {
      this.treeById[item['@id']] = item
      if (this.allTreeIds.includes(item['@id'])) {
        return
      }
      this.allTreeIds.push(item['@id'])
    },

    handleTreeError (e: Error) {
      this.treeError = e.message
    },

    async fetchTree () {
      this.toggleTreeLoading()

      const retrieved = await this.$nuxt.$apiFetch(`${this.resource}/tree`).catch(async (e: Error) => {
        await this.handleTreeError(e)
      }).finally(() => {
        this.toggleTreeLoading()
      })

      if (!retrieved) {
        return
      }
      if (this.resetTree) {
        this.resetTree()
      }

      retrieved['hydra:member'].forEach((item: MediaNode) => {
        this.addTreeItem(item)
      })
    },
  },
  getters: {
    findTree: (state) => (id: string) => state.treeById[id],
    tree(state) {
      const tree: MediaNodeItem[] = []
      state.allTreeIds.forEach((id) => {
        const node = this.findTree(id)
        tree.push({
          '@id': node['@id'],
          id: node.id,
          children: node.children,
          name: node.name
        })
        return tree
      })
      return tree
    },
    rootNodes: (state) => state.list.value.filter((mediaNode: MediaNode) => !mediaNode.parent)
  }
})
