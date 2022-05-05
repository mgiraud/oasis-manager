<template>
  <div class="flex flex-col bg-secondary-light min-h-screen text-sm">
    <header class="fixed top-0 left-0 right-0 block">
      <div class="bg-primary h-36 absolute top-0 left-0 w-full transition-all duration-200" :class="{ 'h-10': scrollY >= 50}">
        <div class="h-full bg-[url('/images/vercors.jpg')] bg-center bg-cover bg-no-repeat" :class="{'opacity-0': scrollY >= 50}"></div>
      </div>
      <div class="h-36 flex items-start transition-all duration-200" :class="{ 'h-10': scrollY >= 50}">
        <div @click="redirectToHome" class="self-end z-40 font-marker text-lg text-white px-4 py-2">Les transalpins</div>
        <div class="grow"></div>
        <div v-if="isAdmin" class="items-center text-primary-dark z-40  mr-1 inline-flex whitespace-nowrap uppercase tracking-wider text-sm py-2 h-10 cursor-pointer">ADMIN</div>
        <div class="h-10 inline-flex items-center pt-1 pb-2">
          <Icon icon="ri-login-box-line" v-if="!isLogged" @click="redirectToLogin" class="h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"/>
          <Icon icon="ri-logout-box-line" v-if="isLogged" @click="logout" class="h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"/>
        </div>
      </div>
      <div class="flex flex-row bg-info flex-wrap">
        <LayoutDefaultMenu />
      </div>
    </header>
    <div class="pt-48 bg-white" :class="{ 'pt-20': scrollY >= 50}">
      <div class="shadow-md flex flex-row justify-center items-center flex-auto">
        <FormKit
          type="email"
          validation="required|email"
          placeholder="Inscris-toi à la newsletter"
          :classes="{
            outer: '$reset p-2 min-w-[400px]',
            inner: '$reset max-w-md border-b border-b-1 border-gray-500 formkit-invalid:border-red-500 mb-1 overflow-hidden focus-within:border-blue-500',
            input: '$reset w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400'
          }"
        >
        </FormKit>
        <div class="mx-3 text-gray-800 text-sm">ET</div>
        <div>
          <button class="bg-primary text-white text-sm px-3 py-1.5 shadow-md rounded-sm">
            <span class="uppercase tracking-wider font-light">Adhère à l'association</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-2 flex-auto">
      <div class="flex bg-white flex-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl font-marker text-primary-dark;
  }
  h2 {
    @apply text-xl font-marker text-primary;
  }
}
</style>

<script setup lang="ts">
  import { onMounted, onUnmounted } from '@vue/runtime-core'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '~/store/auth'
  import { usePageStore } from '~/store/page'
  import LayoutDefaultMenu from '~/components/layout/default/Menu'
  import Icon from '~/components/util/Icon'

  const authStore = useAuthStore();
  const { isLogged, isAdmin } = storeToRefs(authStore)
  const pageStore = usePageStore();
  await useAsyncData('pages', () => {
    return pageStore.fetchAll()
  })

  const redirectToLogin = () => {
    navigateTo('/login')
  }

  const redirectToHome = () => {
    navigateTo('/')
  }

  const logout = () => {
    authStore.logout()
  }

  const menuItems = {'ITEM 1': ['SUB_ITEM 1', 'SUB_ITEM 2', 'SUB_ITEM 3'], 'ITEM 2': [], 'ITEM 3': []}
  const scrollY = ref(0)

  function onScroll() {
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener("scroll", onScroll);
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  })
</script>
