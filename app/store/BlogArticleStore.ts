import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'
import { MediaNode } from '~/store/media_node'
import { Member } from '~/store/member'

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
}

class BlogArticleStore extends PersistentApiStore<BlogArticleState, BlogArticle> {
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

  deleteRole = 'USER_CAN_DELETE_BLOG_ARTICLES'
  editRole = 'USER_CAN_EDIT_BLOG_ARTICLES'
  listRole = 'USER_CAN_VIEW_BLOG_ARTICLES'

}

export const blogArticleStore = new BlogArticleStore('blog_articles')
