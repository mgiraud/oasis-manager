import { call } from '../util/api'

export const state = () => {
  return {
    fileUpload: {
      file: null,
      progress: 0
    }
  }
}
export const mutations = {
  addFileToUpload (state, file) {
    state.fileUpload = {
      file,
      progress: 0
    }
  },
  setFileUploadProgress (state, progress) {
    state.fileUpload.progress = progress
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

    return call('/media_objects', {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body: formData,
      onUploadProgress: (event) => {
        commit('setFileUploadProgress', Math.round((100 * event.loaded) / event.total))
      }
    })
  }
}
