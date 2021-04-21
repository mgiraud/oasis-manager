import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import createRepository, { Repository } from '~/api/repository'

declare module 'vue/types/vue' {
  interface Vue {
      $getRepository(name: string): Repository
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
      $getRepository(name: string): Repository
  }

  interface Context {
      $getRepository(name: string): Repository
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
      $getRepository(name: string): Repository
  }
}

const createRepositories = (context: Context) => {
  const resources = [
    'members', 'media_galleries', 'media_gallery_items', 'media_objects', 'pages', 'blog_articles',
    'page_categories', 'member_groups', 'contacts', 'contact_newsletters', 'survey_joins', 'media_objects',
    'media_galleries', 'media_gallery_items'
  ]
  const repositories: {[name: string]: Repository} = {}
  resources.forEach((resource) => {
    repositories[resource] = createRepository(context, { resource })
  })
  return repositories
}

export default (context: Context, inject: Inject) => {
  const repo = createRepositories(context)
  const getRepository = (resource: string) => repo[resource]
  inject('getRepository', getRepository)
}
