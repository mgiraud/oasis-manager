import { Ref, useRouter, watch } from '@nuxtjs/composition-api'
import { HydraMemberObject } from '~/api/hydra'
import { PersistentApiStore } from '~/store/main'
import { notificationStore } from '~/store/NotificationStore'
import { ElementWithValidation } from '~/vue-shim'

const itemCreate = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>, form: ElementWithValidation) => {
  const router = useRouter()

  const onCreated = (item: U | null) => {
    if (item === null) {
      return
    }
    notificationStore.showMessage(store.getCreateMessage(item))
    const location = store.getEditLocation(item)
    if (location) {
      router.push(location)
    }
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
    form.$v.$touch()
    if (!form.$v.$invalid) {
      store.create(form.$v.item.$model)
    }
  }

  const resetForm = (item: Ref<Object>) => {
    form.$v.$reset()
    item.value = {}
  }
}

export default itemCreate
