<template>
  <div>
    <v-card-title class="primary--text text--darken-4 page-title">
      {{ page.title | capitalize }}
    </v-card-title>
    <v-card-text v-html="page.content" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Page } from '~/store/page'

@Component
export default class PageModel extends Vue {
  @Prop({ type: Object, required: true }) readonly page!: Page
}
</script>

<style scoped lang="scss">
.page-title {
  font-family: 'Permanent Marker';
}
</style>