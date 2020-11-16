import createRepository from '~/api/repository'

export default (context, inject) => {
  const repositories = {
    member: createRepository(context, 'member'),
    gallery: createRepository(context, 'gallery')
  }
  inject('repository', repositories)
}
