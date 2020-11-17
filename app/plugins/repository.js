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
    }),
    page: createRepository(context, {
      name: 'page',
      mutations: {
        $get: 'setPages'
      }
    })
  }
  inject('repository', repositories)
}
