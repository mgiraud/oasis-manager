export const state = () => ({
  pages: [],
  pagesBySlug: {},
  error: null
})

export const mutations = {
  setPages (state, pages) {
    state.pages = pages
    if (!pages) { return }
    const pagesBySlug = {}
    pages.forEach((page) => {
      pagesBySlug[page.slug] = page
    })
    state.pagesBySlug = pagesBySlug
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
  getPageBySlug: state => slug => state.pagesBySlug[slug] ? state.pagesBySlug[slug] : null
}
