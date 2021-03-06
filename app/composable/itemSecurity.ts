import { reactive } from '@nuxtjs/composition-api'
import { HydraMemberObject } from '~/api/hydra'
import { PersistentApiStore } from '~/custom-store/AbstractStore'
import { securityStore } from '~/custom-store/SecurityStore'

const itemSecurity = <T, U extends HydraMemberObject> (store: PersistentApiStore<T, U>) => {
  const canEdit = () => {
    return securityStore.hasPermission(store.editRole)
  }

  const canDelete = () => {
    return securityStore.hasPermission(store.deleteRole)
  }

  const canViewList = () => {
    return securityStore.hasPermission(store.listRole)
  }

  return reactive({
    canEdit,
    canDelete,
    canViewList
  })
}

export default itemSecurity
