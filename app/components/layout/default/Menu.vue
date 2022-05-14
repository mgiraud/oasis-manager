<template>
  <Menu v-slot="{ open }" as="div" class="shadow-sm md:relative flex flex-auto h-10" v-for="(menuItem) in menu">
    <MenuButton @click="redirectTo(menuItem.children.length === 0 ? menuItem.url : null)" class="w-full text-primary-dark text-center before:absolute before:top-0 tracking-widest text-xs uppercase">
      {{menuItem.name}}
      <Icon icon="ri-arrow-right-s-fill" v-if="menuItem.children.length > 0 && !open" class="h-3 w-3 inline-flex fill-primary-dark"></Icon>
      <Icon icon="ri-arrow-down-s-fill" v-if="menuItem.children.length > 0 && open" class="h-3 w-3 inline-flex fill-primary-dark"></Icon>
    </MenuButton>
    <transition
      v-if="menuItem.children.length > 0"
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="flex flex-col flex-auto absolute left-0 top-full w-full bg-primary text-white z-10">
        <MenuItem @click="redirectTo(subMenuItem.url)" as="div" v-slot="{ active }" class="hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer" v-for="subMenuItem in menuItem.children">
          <div class="pl-2 text-xs">{{ subMenuItem.name }}</div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { storeToRefs } from 'pinia'
  import Icon from '~/components/util/Icon'
  import { usePageStore } from '~/store/page'

  const router = useRouter()
  const route = useRoute()
  const pageStore = usePageStore()
  const { menu } = storeToRefs(pageStore)

  const redirectTo = (url: string | null) => {
    if (url !== null) {
      navigateTo(url)
    }
  }
</script>
