import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  if (!authStore.isAdmin) {
    return navigateTo('/login')
  }
})
