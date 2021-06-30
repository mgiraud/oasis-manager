import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/custom-store/AbstractStore'
import { MediaNode } from '~/custom-store/MediaNodeStore'
import { Member } from '~/custom-store/MemberStore'

export type BlogArticle = HydraMemberObject & {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdBy: Member;
  tags: string[];
  showInMenu: boolean;
  mediaNode: MediaNode
}

interface BlogArticleState extends CrudState<BlogArticle> {
  tags: string[]
}

class BlogArticleStore extends PersistentApiStore<BlogArticleState, BlogArticle> {
  protected getAdditionalData (): Partial<BlogArticleState> {
    return {
      tags: []
    }
  }

  getAddLocation (): RawLocation {
    return { name: 'admin-blog-article-new' }
  }

  getEditLocation (item: BlogArticle): RawLocation {
    return {
      name: 'admin-blog-article-id', params: { id: item.id.toString() }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-blog-article' }
  }

  async fetchTags () {
    const retrieved = await this.context.$getRepository(this.storeName).validateAndDecodeResponse('/api/blog_articles/tags')
    this.state.tags = retrieved['hydra:member']
    return this.state.tags
  }

  deleteRole = 'USER_CAN_DELETE_BLOG_ARTICLES'
  editRole = 'USER_CAN_EDIT_BLOG_ARTICLES'
  listRole = 'USER_CAN_VIEW_BLOG_ARTICLES'
}

export const blogArticleStore = new BlogArticleStore('blog_articles')
