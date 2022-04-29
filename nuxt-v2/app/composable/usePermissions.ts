import { onServerPrefetch, reactive, Ref, ssrRef } from '@nuxtjs/composition-api'
import { securityStore } from '../custom-store/SecurityStore'

const usePermissions = () => {
  const permissions = ssrRef([]) as Ref<string[]>

  onServerPrefetch(() => {
    permissions.value = securityStore.loadPermissions()
  })

  securityStore.setPermissions(permissions)

  return reactive({
    permissions
  })
}

export default usePermissions
