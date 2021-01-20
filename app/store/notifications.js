import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  show: false,
  color: 'error',
  text: 'An error occurred',
  subText: '',
  timeout: 10000
})

export const getters = {
  getField
}

export const mutations = {
  updateField
}
