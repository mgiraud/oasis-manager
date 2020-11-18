import createRepository from '~/api/repository'

const createRepositories = (context) => {
  const resources = ['members', 'media_galleries', 'media_gallery_items', 'media_objects', 'pages']
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
