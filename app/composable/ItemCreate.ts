import { reactive, ref, Ref, useRouter, watch } from '@nuxtjs/composition-api'
import { Validation } from '@vuelidate/core'
import { HydraMemberObject } from '~/api/hydra'
import { PersistentApiStore } from '~/store/main'
import { notificationStore } from '~/store/NotificationStore'

const itemCreate = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>) => {
  const router = useRouter()
  const createForm = ref(null) as Ref<Element & Validation | null>

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
    if (!createForm.value) return
    createForm.value.v$.$touch()
    if (!createForm.value.v$.$invalid) {
      // @ts-ignore
      store.create(createForm.value.item)
    }
  }

  const resetForm = (item: Ref<Object>) => {
    if (!createForm.value) return
    createForm.value.v$.$reset()
    item.value = {}
  }

  return reactive({
    createForm,
    onCreated,
    onSendForm,
    resetForm,
    state: store.getState()
  })
}

export default itemCreate
