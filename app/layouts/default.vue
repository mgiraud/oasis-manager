<template>
  <div class="flex flex-auto flex-col">
    <header class="h-36">
      <div class="absolute top-0 left-0 w-full">
        <div class="h-36 bg-[url('/images/vercors.jpg')] bg-center bg-cover bg-no-repeat"></div>
      </div>
      <div class="h-36 flex items-start">
        <div @click="redirectToHome" class="self-end z-40 font-marker text-lg text-white px-4 py-2">Les transalpins</div>
        <div class="grow"></div>
        <LoginIcon v-if="!isLogged" @click="redirectToLogin" class="h-6 w-6 z-40 text-primary-dark mr-1 mt-1 cursor-pointer"/>
        <LogoutIcon v-if="isLogged" @click="logout" class="h-6 w-6 z-40 text-primary-dark mr-1 mt-1 cursor-pointer"/>
      </div>
    </header>
    <div class="flex flex-row flex-auto sticky">
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton>More</MenuButton>
        <MenuItems class="flex flex-col flex-auto">
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Account settings
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Documentation
            </a>
          </MenuItem>
          <MenuItem disabled>
            <span class="opacity-75">Invite a friend (coming soon!)</span>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton>More</MenuButton>
        <MenuItems>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Account settings
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a :class='{ "bg-blue-500": active }' href="/account-settings">
              Documentation
            </a>
          </MenuItem>
          <MenuItem disabled>
            <span class="opacity-75">Invite a friend (coming soon!)</span>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
    <div>
      {{ isLogged }}
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '~/store/auth'
  import { usePageStore } from '~/store/page'
  import { LoginIcon } from '@heroicons/vue/solid'
  import { LogoutIcon } from '@heroicons/vue/solid'

  const authStore = useAuthStore();
  const { isLogged } = storeToRefs(authStore)
  const pageStore = usePageStore();
  await useAsyncData('pages', () => pageStore.fetchAll())

  const redirectToLogin = () => {
    navigateTo('/login')
  }

  const redirectToHome = () => {
    navigateTo('/')
  }

  const logout = () => {
    authStore.logout()
  }
</script>
