export const state = () => ({
  pages: [],
  pagesByUrl: {},
  error: null
})

export const mutations = {
  setPages (state, pages) {
    state.pages = pages
    if (!pages) { return }
    const pagesByUrl = {}
    pages.forEach((page) => {
      pagesByUrl[page.url] = page
    })
    state.pagesByUrl = pagesByUrl
  },
  setError (state, error) {
    state.error = error
  }
}

export const actions = {
  async getPages ({ commit }) {
    return await this.$repository.page.$get('/pages')
  }
}

export const getters = {
  getPageByUrl: state => url => state.pagesByUrl[url] ? state.pagesByUrl[url] : null
}
