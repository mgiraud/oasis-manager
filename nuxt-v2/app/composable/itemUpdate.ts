import { useRouter, onBeforeUnmount, computed, useRoute, ref, Ref, reactive, watch } from '@nuxtjs/composition-api'
import { Validation } from '@vuelidate/core'
import { HydraMemberObject } from '../api/hydra'
import { PersistentApiStore } from '../custom-store/AbstractStore'
import { notificationStore } from '../custom-store/NotificationStore'

const itemUpdate = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>) => {
  const router = useRouter()
  const route = useRoute()
  const item = ref({}) as Ref<U>
  const retrieved: Ref<U | null> = ref(null)
  const updateForm = ref(null) as Ref<Element & Validation | null>

  store.load(store.getIdentifierFromUrlParam(route.value.params.id)).then((item) => {
    if (item) {
      retrieved.value = item
    }
  })

  const del = () => {
    if (!retrieved || !retrieved.value) {
      return
    }
    store.del(retrieved.value).then(() => {
      notificationStore.showMessage(store.getDeleteMessage(item.value))
    })
  }

  const reset = () => {
    if (!updateForm.value) {
      return
    }
    updateForm.value.v$.$reset()
    store.resetUpdate()
    store.resetDelete()
    store.resetCreate()
  }

  const onSendForm = () => {
    if (!updateForm.value) {
      return
    }
    updateForm.value.v$.$touch()

    if (!updateForm.value.v$.$invalid) {
      // @ts-ignore
      store.update(updateForm.value.item)
    }
  }

  const resetForm = () => {
    if (!updateForm.value) {
      return
    }
    updateForm.value.v$.$reset()
    if (retrieved.value) {
      item.value = { ...retrieved.value }
    }
  }

  const back = () => {
    const location = store.getListLocation()
    if (location) {
      router.push(location)
    }
  }

  watch(() => store.getState().deleted, (deleted: U | null) => {
    if (!deleted) {
      return
    }
    back()
  })

  watch(() => store.getState().error, (message: string | null) => {
    message && notificationStore.showError(message)
  })

  watch(() => store.getState().updated, (val: U | null) => {
    if (val) {
      notificationStore.showMessage(store.getUpdateMessage(val))
    }
  })

  watch(() => retrieved.value, (val: U | null) => {
    if (val) {
      item.value = { ...val }
    }
  })

  onBeforeUnmount(() => {
    reset()
  })

  return reactive({
    updateForm,
    retrieved,
    item,
    del,
    reset,
    onSendForm,
    resetForm,
    back,
    state: store.getState()
  })
}

export default itemUpdate
