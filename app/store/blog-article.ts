import { defineStore } from 'pinia'
import { CRUD_MODE, CrudState, crudState } from '~/store/crud'
import { MediaObject } from '~/store/media-object'
import { HydraMemberObject } from '~/types/hydra'
import { MediaNode } from '~~/nuxt-v2/app/custom-store/MediaNodeStore'
import { Member } from '~~/nuxt-v2/app/custom-store/MemberStore'

export interface BlogArticle extends HydraMemberObject {
  id: number,
  title: string,
  content: string,
  isPublished: boolean,
  createdBy: Member,
  tags: string[],
  showInMenu: boolean,
  mediaNode: MediaNode,
}

interface BlogArticleState extends CrudState<BlogArticle> {
  resource: string,
  tags: string[],
  activeTags: string[],
}

export const useBlogArticleStore = defineStore('blog_articles', {
  state: (): BlogArticleState => {
    return {
      resource: '/blog_articles',
      tags: [],
      activeTags: [],
      ...crudState
    }
  },
  actions: {
    findBySlug (slug: string): BlogArticle | null {
      return this.list.find((page: BlogArticle) => page.url === slug)
    },
    async fetchTags () {
      const data = await this.$nuxt.$apiFetch('/blog_articles/tags')
      .catch(async (e: Error) => {
      })
      if (!data) {
        return;
      }
      this.tags = data['hydra:member']
    },
    getRandomImage(article: BlogArticle) {
      if (!article.mediaNode || article.mediaNode.length === 0) {
        return null
      }
      const images = article.mediaNode.mediaObjects.filter((mediaObject: MediaObject) => mediaObject.isImage)
      return images[Math.floor(Math.random() * images.length)]
    }
  },
  getters: {
    listWithActiveTags: (state) => computed(() => {
      const list = state[CRUD_MODE.LIST].allIds.map((id: string) => state[CRUD_MODE.LIST].byId[id]);
      if (state.activeTags.length === 0) {
        return list
      } else {
        return list.filter((article: BlogArticle) => article.tags.some(tag => state.activeTags.includes(tag)))
      }
    })
  }
})
