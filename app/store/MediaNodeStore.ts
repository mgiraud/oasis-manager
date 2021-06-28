import { computed } from '@nuxtjs/composition-api'
import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/AbstractStore'
import { MediaObject } from '~/store/MediaObjectStore'

export interface breadcrumbItem {
  '@id': string
  name: string
  type: 'item' | 'gallery'
}

export interface MediaNode extends HydraMemberObject {
  id: number
  name: string
  description: string
  children: MediaNode[]
  mediaObjects: MediaObject[]
  breadcrumb: breadcrumbItem[]
  parent?: string
}

export interface MediaNodeNew {
  name: string
  parent: string
}

export interface MediaNodeItem {
  '@id': string
  name: string
  children: MediaNodeItem[]
}

interface MediaNodeState extends CrudState<MediaNode> {
  treeIsLoading: boolean,
  resetTree: boolean,
  treeError: string,
  allTreeIds: string[]
  treeById: { [index: string]: MediaNode }
}

class MediaNodeStore extends PersistentApiStore<MediaNodeState, MediaNode> {
  protected getAdditionalData () {
    return {
      allTreeIds: [],
      treeById: {},
      treeError: '',
      treeIsLoading: false,
      resetTree: false
    }
  }

  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: MediaNode): RawLocation | null {
    return null
  }

  getIdentifierFromUrlParam (param: string): string {
    return ''
  }

  getListLocation (): RawLocation | null {
    return null
  }

  deleteRole = 'USER_CAN_DELETE_GALLERIES'
  editRole = 'USER_CAN_EDIT_GALLERIES'
  listRole = 'USER_CAN_ACCESS_GALLERIES'

  toggleTreeLoading () {
    this.state.treeIsLoading = !this.state.treeIsLoading
  }

  resetTree () {
    Object.assign(this.state, {
      allTreeIds: [],
      treeById: {},
      treeError: '',
      treeIsLoading: false,
      resetTree: false
    })
  }

  addTreeItem (item: MediaNode) {
    this.state.treeById[item['@id']] = item
    if (this.state.allTreeIds.includes(item['@id'])) {
      return
    }
    this.state.allTreeIds.push(item['@id'])
  }

  handleTreeError (e: Error) {
    this.state.treeError = e.message
  }

  async fetchTree () {
    this.toggleTreeLoading()

    try {
      const retrieved = await this.context.$getRepository(this.storeName).validateAndDecodeResponse('media_nodes/tree')

      if (this.state.resetTree) {
        this.resetTree()
      }

      (retrieved['hydra:member'] as HydraMemberObject[]).forEach((item) => {
        this.addTreeItem(item)
      })

      this.toggleTreeLoading()
      return retrieved
    } catch (e) {
      this.handleTreeError(e)
    }
  }

  findTree (id: string) {
    return this.state.treeById[id]
  }

  tree = computed(() => {
    const tree: MediaNodeItem[] = []
    this.state.allTreeIds.forEach((id) => {
      const node = this.findTree(id)
      tree.push({
        '@id': node['@id'],
        children: node.children,
        name: node.name
      })
      return tree
    })
    return tree
  })

  rootNodes = computed(() => this.list.value.filter((mediaNode: MediaNode) => !mediaNode.parent))
}

export const mediaNodeStore = new MediaNodeStore('media_nodes')
