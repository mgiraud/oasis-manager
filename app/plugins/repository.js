import createRepository from '~/api/repository'

export default (context, inject) => {
  const repository = createRepository(context)
  inject('repository', repository)
}
