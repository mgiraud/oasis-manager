import createRepository from '~/api/repository'

export default (context, inject) => {
  const repositories = {
    member: createRepository(context, {
      name: 'member',
      mutations: {
        $get: 'setMembers'
      }
    }),
    gallery: createRepository(context, {
      name: 'gallery',
      mutations: {
        $get: 'setGalleries'
      }
    })
  }
  inject('repository', repositories)
}
