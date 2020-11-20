<template>
  <v-toolbar-items class="hidden-sm-and-down">
    {{ menuItems }}
    <component :is="item.items ? 'PageMenuNestedMenu' : 'PageMenuTab'" v-for="item in menuItems" :key="item.name" :item="item" />
  </v-toolbar-items>
</template>

<script>
import { mapGetters } from 'vuex'
import { has } from 'lodash'

export default {
  resourcePrefix: '/api/pages/',
  computed: {
    ...mapGetters('page', { pages: 'list' }),
    menuItems () {
      const menu = []
      this.pages.forEach(function (page) {
        const item = {
          name: page.title,
          url: page.url,
          items: null
        }
        if (page.category) {
          if (!has(menu, page.category.slug)) {
            menu[page.category.slug] = {
              name: page.category.slug,
              items: []
            }
          }
          menu[page.category.slug].items.push(item)
        } else {
          menu.push(item)
        }
      })
      console.log(menu)
      return menu
    }
  }
}
</script>
