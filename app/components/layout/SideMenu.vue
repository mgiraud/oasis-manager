<template>
  <v-sheet
    class="pa-4"
  >
    <v-list>
      <template v-for="(menuItem, i) in menu">
        <v-list-item v-if="!menuItem.children" :key="i" :to="menuItem.url">
          <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
        </v-list-item>
        <v-list-group v-if="menuItem.children" :key="i" :to="menuItem.url">
          <template #activator>
            <v-list-item-title>{{ menuItem.name }} </v-list-item-title>
          </template>
          <v-list-item v-for="(subMenuItem, j) in menuItem.children" :key="j" :to="subMenuItem.url">
            <v-list-item-title>{{ subMenuItem.name }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, namespace, State, Component, Watch, Prop } from 'nuxt-property-decorator'
import { MenuItem } from '~/store/page'

const pageModule = namespace('page')

@Component
export default class SideMenu extends Vue {
    @pageModule.Getter('menu') menu !: MenuItem[]
    mounted () {
      console.log(this.menu)
    }
}
</script>
