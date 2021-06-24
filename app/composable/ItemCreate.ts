import { Ref, useRouter, watch } from '@nuxtjs/composition-api'
import { HydraMemberObject } from '~/api/hydra'
import { PersistentApiStore } from '~/store/main'
import { notificationStore } from '~/store/NotificationStore'
import { ElementWithValidation } from '~/vue-shim'

interface CreateItemOptions<U> {
    creationMessageIdentifier: keyof U,
    redirectAfterCreationName: string,
    redirectAfterCreationParamIdentifier: keyof U,
    form: ElementWithValidation
}

const createItem = <T, U extends HydraMemberObject>(store: PersistentApiStore<T, U>, options: CreateItemOptions<U> = {
  creationMessageIdentifier: 'id',
  redirectAfterCreationName: 'admin',
  redirectAfterCreationParamIdentifier: 'admin'
}) => {
  const router = useRouter()

  const onCreated = (item: U | null) => {
    if (item === null) {
      return
    }
    notificationStore.showMessage(`${item[options.creationMessageIdentifier]} created`)


    router.push({
      name: options.redirectAfterCreationName,
      params: { [options.redirectAfterCreationParamIdentifier]: item[options.redirectAfterCreationParamIdentifier] }
    })
  }

  watch(() => store.getState().created, (created: U | null) => {
    if (!created) {
      return
    }
    onCreated(created)
  })

  watch(() => store.getState().error, (message: string | null) => {
    message && notificationStore.showError(message)
  })

  const onSendForm = () => {
    options.form.$v.$touch()
    if (!options.form.$v.$invalid) {
      store.create(options.form.$v.item.$model)
    }
  }

  const resetForm = (item: Ref<Object>) => {
    options.form.$v.$reset()
    item.value = {}
  }
}

export default createItem
