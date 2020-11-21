import { find, filter } from 'lodash'
import makeCrudModule from './crud'

const pageModule = makeCrudModule({
  resource: 'pages',
  index: 'url',
  additionalState: {
    activeSlug: null
  }
})

pageModule.getters.menuItems = (state, getters, rootState) => {
  const menu = []
  getters.list.forEach((page) => {
    if (!page || !page.showInMenu) {
      return
    }
    if (page.category) {
      if (!page.category.showInMenu) {
        return
      }
      if (!find(menu, { name: page.category.slug })) {
        menu.push({
          name: page.category.name,
          slug: page.category.slug,
          url: null
        })
      }
    } else {
      menu.push({
        name: page.title,
        url: page.url
      })
    }
  })
  return menu
}

pageModule.getters.findByActiveSlug = (state, getters) => {
  return filter(getters.list, function (page) {
    return page.category && page.category.slug === state.activeSlug
  })
}

pageModule.mutations.setActiveSlug = (state, slug) => {
  Object.assign(state, { activeSlug: slug })
}

export default pageModule
