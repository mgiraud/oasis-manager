import { $Fetch } from 'ohmyfetch'

declare module '#app' {
  interface NuxtApp {
    $apiFetch (): $Fetch
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $apiFetch (): $Fetch
  }
}

export { }
