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
    return { name: 'blog-article-new' }
  }

  getEditLocation (item: BlogArticle): RawLocation {
    return {
      name: 'blog-article-id', params: { id: item.id.toString() }
    }
  }
}

export const blogArticleStore = new BlogArticleStore('blog_articles')
