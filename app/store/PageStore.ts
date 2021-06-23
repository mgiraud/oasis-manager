import { CrudState, PersistentApiStore } from '~/store/main'


interface PageState extends CrudState {
}

class PageStore extends PersistentApiStore<PageState> {
}

export const pageStore = new PageStore('pages');