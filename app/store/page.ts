import { find, filter } from 'lodash'
import makeCrudModule from './crud'
import { PageCategory } from './page_category'
import { HydraMemberObject } from '~/api/hydra'

const pageModule = makeCrudModule({
  resource: 'pages'
})

export type Page = HydraMemberObject & {
  'url': string;
  'title': string;
  'content': string;
  'isPublished': boolean;
  'category': PageCategory;
  'showInMenu': boolean;
}

export type MenuItem = {
  name: string;
  slug: string | null;
  url: string | null;
}

pageModule.getters.menuItems = (_state, getters) => {
  const menu: MenuItem[] = []
  getters.list.forEach((page: Page) => {
    if (!page || !page.showInMenu) {
      return
    }
    if (page.category) {
      if (!page.category.showInMenu) {
        return
      }
      if (!find(menu, { slug: page.category.slug })) {
        menu.push({
          name: page.category.name,
          slug: page.category.slug,
          url: null
        })
      }
    } else {
      menu.push({
        name: page.title,
        url: page.url,
        slug: null
      })
    }
  })

  menu.push({
    name: 'Contact',
    url: 'contact',
    slug: null
  })

  menu.push({
    name: 'Rejoindre le groupe fondateur',
    url: 'survey_join',
    slug: null
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
