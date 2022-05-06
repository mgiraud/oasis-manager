<template>
  <div>
    <Menu v-slot="{ open }" as="div" class="shadow-sm relativetext-left flex flex-auto h-10" v-for="(menuItem) in menu">
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
        <MenuItems class="flex flex-col flex-auto absolute left-0 top-full w-full bg-primary text-white">
          <MenuItem @click="redirectTo(subMenuItem.url)" as="div" v-slot="{ active }" class="hover:bg-primary-dark h-10 uppercase flex-auto flex items-center cursor-pointer" v-for="subMenuItem in menuItem.children">
            <div class="pl-2 text-xs">{{ subMenuItem.name }}</div>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Icon from '~/components/util/Icon.vue'
import { usePageStore } from '~/store/page'

const router = useRouter()
const route = useRoute()
const pageStore = usePageStore()

const blogItems = {
  name: 'Blog',
  icon: 'ri-folder-open-line',
  items: [['ri-article-line', 'Article', 'admin-blog-article', 'USER_CAN_ACCESS_BLOG_ARTICLES']]
}

const pageItems = {
  name: 'Blog',
  icon: 'ri-folder-open-line',
  items: [
    ['ri-article-line', 'Pages', 'admin-page', 'USER_CAN_ACCESS_PAGES'],
    ['ri-folder-line', 'Categories', 'admin-page-category', 'USER_CAN_ACCESS_PAGE_CATEGORIES']
  ]
}

const memberItems = [
  ['ri-user-line', 'Gérer les membres', 'admin-member', 'USER_CAN_ACCESS_MEMBERS'],
  ['ri-group-line', 'Gérer les groupes', 'admin-member-group', 'USER_CAN_ACCESS_MEMBER_GROUPS'],
  ['ri-contacts-line', 'Prises de contact', 'admin-contact', 'USER_CAN_VIEW_CONTACT'],
  ['ri-mail-line', 'Inscriptions à la newsletter', 'admin-contact-newsletter', 'USER_CAN_VIEW_CONTACT_NEWSLETTER'],
  ['ri-survey-line', 'Réponses au questionnaire', 'admin-survey-join', 'USER_CAN_VIEW_SURVEY_JOIN']
]

const redirectTo = (url: string | null) => {
  if (url !== null) {
    navigateTo(url)
  }
}
</script>
