import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import createRepository, { Repository } from '~/api/repository'

const createRepositories = (context: Context) => {
  const resources = ['members', 'media_galleries', 'media_gallery_items', 'media_objects', 'pages',
    'page_categories', 'member_groups', 'contacts', 'contact_newsletters', 'survey_joins']
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
