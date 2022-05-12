<template>
  <div class="flex flex-col bg-gray-100">
    <Menu v-slot="{ open }" as="div" class="text-left flex flex-wrap" v-for="item in items">
      <MenuButton @click="item.onClick ? item.onClick() : redirectTo(item.url)" class="p-3 grow shrink basis-full text-primary-dark text-left before:absolute before:top-0 tracking-widest text-xs uppercase flex items-center">
        <Icon :icon="item.icon" v-if="item.icon" class="h-3 w-3 inline-flex fill-primary-dark" />
        <div class="flex-auto" :class="{'pl-3': item.icon, 'pl-6': !item.icon}">{{item.label}}</div>
        <Icon icon="ri-arrow-right-s-fill" v-if="item.children.length > 0 && !open" class="h-3 w-3 inline-flex fill-primary-dark"/>
        <Icon icon="ri-arrow-down-s-fill" v-if="item.children.length > 0 && open" class="h-3 w-3 inline-flex fill-primary-dark"/>
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="flex flex-col flex-auto w-full text-primary pl-6">
          <MenuItem @click="redirectTo(subItem.url)" as="div" v-slot="{ active }" class="p-3 hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer" v-for="subItem in item.children">
            <div class="pl-2 text-xs flex-auto">{{ subItem.label }}</div>
            <Icon :icon="subItem.icon" v-if="subItem.icon" class="h-3 w-3 inline-flex" :class="{'fill-primary-dark' : !open, 'fill-primary': open}" />
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Icon from '~/components/util/Icon.vue'
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()

const logout = () => {
  console.log('pouet')
  authStore.logout()
  navigateTo({ name: 'index' })
}

const redirectTo = (url: string | null) => {
  if (url !== null) {
    navigateTo({name: url})
  }
}

const items = [
  {
    label: 'Acueil',
    icon: 'ri-home-line',
    children: [],
    url: 'admin'
  }, {
    label: 'Gérer les fichiers',
    icon: 'ri-folder-open-line',
    children: [],
    url: 'admin-media'
  },
  {
    label: 'Blog',
    children: [
      {icon: 'ri-article-line', label: 'Article', url: 'admin-blog-article', permission: 'USER_CAN_ACCESS_BLOG_ARTICLES'},
    ]
  }, {
    label: 'Pages',
    children: [
      {icon: 'ri-article-line', label: 'Pages', url: 'admin-pages', permission: 'USER_CAN_ACCESS_PAGES'},
      {icon: 'ri-folder-line', label: 'Categories', url: 'admin-categories', permission: 'USER_CAN_ACCESS_PAGE_CATEGORIES'},
    ]
  }, {
    label: 'Membres',
    children: [
      // {icon: 'ri-user-line', label: 'Gérer les membres', url: 'admin-member', permission: 'USER_CAN_ACCESS_MEMBERS'},
      // {icon: 'ri-group-line', label: 'Gérer les groupes', url: 'admin-member-group', permission: 'USER_CAN_ACCESS_MEMBER_GROUPS'},
      {icon: 'ri-contacts-line', label: 'Prises de contact', url: 'admin-contact', permission: 'USER_CAN_VIEW_CONTACT'},
      {icon: 'ri-mail-line', label: 'Inscriptions à la newsletter', url: 'admin-contact-newsletter', permission: 'USER_CAN_VIEW_CONTACT_NEWSLETTER'},
      {icon: 'ri-survey-line', label: 'Réponses au questionnaire', url: 'admin-survey-join', permission: 'USER_CAN_VIEW_SURVEY_JOIN'},
    ]
  }, {
    label: 'Retour au site',
    icon: 'ri-arrow-left-circle-fill',
    children: [],
    url: 'index'
  }, {
    label: 'Déconnexion',
    icon: 'ri-logout-circle-line',
    onClick: logout,
    children: [],
  }
]
</script>
