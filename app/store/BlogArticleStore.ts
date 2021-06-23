import { CrudState, PersistentApiStore } from '~/store/main'

interface BlogArticleState extends CrudState {
}

class BlogArticleStore extends PersistentApiStore<BlogArticleState> {
}

export const blogArticleStore = new BlogArticleStore('blog_articles')
