import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { Page } from '~/store/page'
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
  mediaNode: MediaNode
}

interface BlogArticleState extends CrudState<BlogArticle> {
  resource: string,
  tag: string[]
}

export const useBlogArticleStore = defineStore('blog_articles', {
  state: ():BlogArticleState => {
    return {
      resource: '/blog_articles',
      tag: [],
      ...crudState
    }
  }
})
