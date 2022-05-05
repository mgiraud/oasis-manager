import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { PageCategory } from '~/store/page-category'
import { HydraMemberObject } from '~/types/hydra'
import { MediaNode } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'
import { MenuItem } from '~~/nuxt-v2/app/custom-store/PageStore'

export interface Page extends HydraMemberObject {
  url: string,
  title: string,
  content: string,
  isPublished: boolean,
  category: PageCategory,
  showInMenu: boolean,
  mediaNode: MediaNode | null,
}

export type PageMenuItem = {
  name: string;
  slug: string | null;
  url: string | null;
  children: PageMenuItem[]
}

interface PageState extends CrudState<Page>{
  resource: string,
  activeSlug: string | null
}

export const usePageStore = defineStore('page', {
  state: (): PageState => {
    return {
      resource: '/pages',
      activeSlug: null,
      ...crudState
    }
  },
  actions: {
    findBySlug(slug: string): Page|null {
      return this.list.find((page: Page) => page.url === slug)
    },

    setActiveSlug (slug: string | null) {
      this.activeSlug = slug
    },
  },
  getters: {
    findByActiveSlug(state) {
      return this.list.filter((page: Page) => page.category && page.category.slug === state.activeSlug)
    },
    menu() {
      const menu: MenuItem[] = []
      this.list.forEach((page: Page) => {
        if (!page || !page.showInMenu) {
          return
        }
        if (page.category) {
          if (!page.category.showInMenu) {
            return
          }
          const categoryItem = menu.find((item) => page.category.slug === item.slug)
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
              slug: null,
              children: []
            })
          }
        } else {
          menu.push({
            name: page.title,
            url: page.url,
            slug: null,
            children: []
          })
        }
      })

      const prependStaticPages = (menu: MenuItem[]) => {
        if (menu.length === 0) {
          return
        }
        menu.unshift({
          name: 'Blog',
          url: 'blog',
          slug: null,
          children: []
        })
      }

      const appendStaticPages = (menu: MenuItem[]) => {
        if (menu.length === 0) {
          return
        }
        menu.push({
          name: 'Contacte-nous !',
          url: 'contact',
          slug: null,
          children: []
        })

        menu.push({
          name: 'Rejoindre le groupe fondateur',
          url: 'survey_join',
          slug: null,
          children: []
        })
      }
      prependStaticPages(menu)
      appendStaticPages(menu)

      return menu
    }
  }
})
