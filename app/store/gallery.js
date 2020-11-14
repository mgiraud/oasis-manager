import { call } from '../util/api'

export const state = () => ({
  fileUpload: {
    file: null,
    progress: 0
  },
  selectedGalleryItem: null,
  galleries: null,
  items: [],
  objectByGalleryItem: {}
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
  setSelectedGalleryItem (state, selected) {
    state.selectedGalleryItem = selected
  },
  setObjectsForGalleryItem (state, { itemId, objects }) {
    state.objectByGalleryItem = { ...state.objectByGalleryItem, ...{ itemId: objects } }
  }
}

export const actions = {
  addFileUpload ({ commit }, file) {
    commit('addFileToUpload', file)
  },
  uploadFile ({ commit, state }) {
    if (!state.fileUpload.file) {
      return
    }
    const formData = new FormData()
    formData.append('file', state.fileUpload.file)
    formData.append('mediaGalleryItem', state.selectedGalleryItem)

    return call('/media_objects', {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body: formData,
      onUploadProgress: (event) => {
        commit('setFileUploadProgress', Math.round((100 * event.loaded) / event.total))
      }
    })
  },
  async getGalleries ({ commit }, { $repository }) {
    const responseBody = await $repository.$get('/api/media_galleries')
    commit('setGalleries', responseBody)
  },
  async setSelectedGalleryFromItem ({ commit, state }, { $repository, galleryId }) {
    const gallery = state.galleries.find((gallery) => {
      return parseInt(gallery.id) === parseInt(galleryId)
    })
    if (!gallery || !gallery.rootItem) { return }
    commit('setSelectedGalleryItem', gallery.rootItem.id)
    let objects = null
    if (state.objectByGalleryItem[gallery.rootItem.id] === {}) {
      objects = await $repository.$get('/api/media_galleries')
    } else {
      objects = await state.objectByGalleryItem[gallery.rootItem.id]
    }
    commit('setObjectsForGalleryItem', { itemId: gallery.rootItem.id, objects })
  }
}
