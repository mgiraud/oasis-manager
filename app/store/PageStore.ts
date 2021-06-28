import { computed } from '@nuxtjs/composition-api'
import { filter, find } from 'lodash'
import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/AbstractStore'
import { MediaNode } from '~/store/MediaNodeStore'
import { PageCategory } from '~/store/PageCategoryStore'

export type Page = HydraMemberObject & {
  'url': string;
  'title': string;
  'content': string;
  'isPublished': boolean;
  'category': PageCategory;
  'showInMenu': boolean;
  'mediaNode': MediaNode | null;
}

export type MenuItem = {
  name: string;
  slug: string | null;
  url: string | null;
  children?: MenuItem[]
}

interface PageState extends CrudState<Page> {
}

class PageStore extends PersistentApiStore<PageState, Page> {
  menuItems = computed(() => {
    const menu: MenuItem[] = []
    this.list.value.forEach((page: Page) => {
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

    this.appendStaticPages(menu)
    return menu
  })

  menu = computed(() => {
    const menu: MenuItem[] = []
    this.list.value.forEach((page: Page) => {
      if (!page || !page.showInMenu) {
        return
      }
      if (page.category) {
        if (!page.category.showInMenu) {
          return
        }
        const categoryItem = find(menu, { slug: page.category.slug })
        if (!categoryItem) {
          menu.push({
            name: page.category.name,
            slug: page.category.slug,
            url: null,
            children: [{
              name: page.title,
              url: page.url,
              slug: null
            }]
          })
        } else {
          categoryItem.children?.push({
            name: page.title,
            url: page.url,
            slug: null
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

    this.appendStaticPages(menu)
    return menu
  })

  appendStaticPages (menu: MenuItem[]) {
    if (menu.length === 0) return
    menu.push({
      name: 'Contacte-nous !',
      url: 'contact',
      slug: null
    })

    menu.push({
      name: 'Rejoindre le groupe fondateur',
      url: 'survey_join',
      slug: null
    })
  }

  setActiveSlug (slug: string | null) {
    this.state.activeSlug = slug
  }

  findByActiveSlug = computed(() => filter(this.list.value, (page: Page) => {
      return page.category && page.category.slug === this.state.activeSlug
    })
  )

  getAddLocation (): RawLocation | null {
    return { name: 'admin-page-new' }
  }

  getEditLocation (item: Page): RawLocation | null {
    return {
      name: 'admin-page-id',
      params: {
        id: item.url
      }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-page' }
  }

  listRole = 'USER_CAN_ACCESS_PAGES'
  editRole = 'USER_CAN_EDIT_PAGES'
  deleteRole = 'USER_CAN_DELETE_PAGES'
}

export const pageStore = new PageStore('pages')
