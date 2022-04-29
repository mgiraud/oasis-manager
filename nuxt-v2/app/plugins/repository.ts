import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { HydraMemberObject } from '../api/hydra'
import createRepository, { Repository } from '../api/repository'

declare module 'vue/types/vue' {
  interface Vue {
      $getRepository: <U extends HydraMemberObject>(name: string) => Repository<U>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
      $getRepository: <U extends HydraMemberObject>(name: string) => Repository<U>
  }

  interface Context {
      $getRepository: <U extends HydraMemberObject>(name: string) => Repository<U>
  }
}

const createRepositories = (context: Context) => {
  const resources = [
    'members', 'media_nodes', 'media_objects', 'pages', 'blog_articles',
    'page_categories', 'member_groups', 'contacts', 'contact_newsletters', 'survey_joins', 'media_objects',
    'media_nodes', 'page_logs'
  ]
  const repositories: {[name: string]: Repository<HydraMemberObject>} = {}
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
