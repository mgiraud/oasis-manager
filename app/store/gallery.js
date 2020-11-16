export const state = () => ({
  fileUpload: {
    file: null,
    progress: 0
  },
  selectedGalleryItem: null,
  galleries: null,
  items: {},
  objectByGalleryItem: {},
  error: ''
})

export const mutations = {
  addFileToUpload (state, file) {
    state.fileUpload = {
      file,
      progress: 0
    }
  },
  setFileUploadProgress (state, progress) {
    state.fileUpload.progress = progress
  },
  setGalleries (state, galleries) {
    state.galleries = galleries
  },
  addGalleryItem (state, item) {
    state.items = { ...state.items, ...{ [item.id]: item } }
  },
  setSelectedGalleryItem (state, selected) {
    state.selectedGalleryItem = selected
  },
  setObjectsForGalleryItem (state, { itemId, objects }) {
    state.objectByGalleryItem = { ...state.objectByGalleryItem, ...{ [itemId]: objects } }
  },
  addObjectToGalleryItem (state, mediaObject) {
    const objectItemObjects = state.objectByGalleryItem[state.selectedGalleryItem.id] ? state.objectByGalleryItem[state.selectedGalleryItem.id] : []
    objectItemObjects.push(mediaObject)
    state.objectByGalleryItem = { ...state.objectByGalleryItem, ...{ [state.selectedGalleryItem.id]: objectItemObjects } }
  }
}

export const actions = {
  addFileUpload ({ commit }, file) {
    commit('addFileToUpload', file)
  },
  async uploadFile ({ commit, state }) {
    if (!state.fileUpload.file) {
      return
    }
    const formData = new FormData()
    formData.append('file', state.fileUpload.file)
    formData.append('mediaGalleryItemId', state.selectedGalleryItem.id)

    const mediaObject = await this.$repository.gallery.$post('/media_objects', {
      'Content-Type': 'multipart/form-data',
      body: formData,
      onUploadProgress: (event) => {
        commit('setFileUploadProgress', Math.round((100 * event.loaded) / event.total))
      }
    })

    commit('addObjectToGalleryItem', mediaObject)
    return mediaObject
  },
  async getGalleries ({ commit }) {
    return await this.$repository.gallery.$get('/api/media_galleries')
  },
  async setSelectedItemFromGalleryId ({ commit, state }, galleryId) {
    const gallery = state.galleries.find((gallery) => {
      return parseInt(gallery.id) === parseInt(galleryId)
    })
    if (!gallery || !gallery.rootItem) { return }
    commit('setSelectedGalleryItem', gallery.rootItem)
    let objects = null
    if (state.objectByGalleryItem[gallery.rootItem.id] === {}) {
      objects = await this.$repository.gallery.$get('/api/media_galleries')
    } else {
      objects = await state.objectByGalleryItem[gallery.rootItem.id]
    }
    commit('setObjectsForGalleryItem', { itemId: gallery.rootItem.id, objects })
  },
  async setSelectedItemId ({ commit, state }, itemId) {
    let galleryItem = null
    if (state.items[itemId] !== undefined) {
      galleryItem = state.items[itemId]
    } else {
      galleryItem = await this.$repository.gallery.$getOne(`/api/media_gallery_items/${itemId}`)
      if (galleryItem) { commit('addGalleryItem', galleryItem) }
    }
    if (galleryItem) { commit('setSelectedGalleryItem', galleryItem) }
  },
  async getMediaObjectForGalleryItemId ({ commit, state }, itemId) {
    const responseBody = await this.$repository.gallery.$get(`/api/media_objects?mediaGalleryItem.id=${itemId}`)
    commit('setObjectsForGalleryItem', { objects: responseBody, itemId })
  }
}

export const getters = {
  getMediaObjectsForSelectedGalleryItem (state) {
    const selectedItemId = state.selectedGalleryItem ? state.selectedGalleryItem.id : null
    return selectedItemId && state.objectByGalleryItem[selectedItemId] ? state.objectByGalleryItem[selectedItemId] : []
  }
}
