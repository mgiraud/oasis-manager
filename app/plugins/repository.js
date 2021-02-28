import createRepository from '~/api/repository'

const createRepositories = (context) => {
  const resources = ['members', 'media_galleries', 'media_gallery_items', 'media_objects', 'pages',
    'page_categories', 'member_groups', 'contacts', 'contact_newsletters', 'survey_joins']
  const repositories = {}
  resources.forEach((resource) => {
    repositories[resource] = createRepository(context, { resource })
  })
  return repositories
}

export default (context, inject) => {
  const repo = createRepositories(context)
  const getRepository = resource => repo[resource]
  inject('getRepository', getRepository)
}
