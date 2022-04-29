<template>
  <v-sheet
    class="pa-4"
    color="primary darken-3"
  >
    <v-list>
      <template v-for="(menuItem, i) in menu">
        <v-list-item
          v-if="!menuItem.children"
          :key="i"
          :to="menuItem.url"
        >
          <v-list-item-title class="white--text">
            {{ menuItem.name }}
          </v-list-item-title>
        </v-list-item>
        <v-list-group
          v-if="menuItem.children"
          :key="i"
          :to="menuItem.url"
        >
          <template #activator>
            <v-list-item-title class="primary--text">
              {{ menuItem.name }}
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="(subMenuItem, j) in menuItem.children"
            :key="j"
            :to="subMenuItem.url"
          >
            <v-list-item-title class="white--text">
              {{ subMenuItem.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { pageStore } from '../../custom-store/PageStore'

export default defineComponent({
  setup () {
    pageStore.setContext(useContext())

    return {
      menu: pageStore.menu
    }
  }
})
</script>
