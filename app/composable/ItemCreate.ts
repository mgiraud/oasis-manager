import { reactive, Ref, useRouter, watch } from '@nuxtjs/composition-api'
import { Validation } from '@vuelidate/core'
import { HydraMemberObject } from '~/api/hydra'
import { PersistentApiStore } from '~/store/main'
import { notificationStore } from '~/store/NotificationStore'

const itemCreate = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>, form: Ref<Element & Validation>) => {
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
    console.log(form.value)
    form.value.v$.$touch()
    if (!form.value.v$.$invalid) {
      // @ts-ignore
      store.create(form.value.item)
    }
  }

  const resetForm = (item: Ref<Object>) => {
    form.value.v$.$reset()
    item.value = {}
  }

  return reactive({
    onCreated,
    onSendForm,
    resetForm
  })
}

export default itemCreate
