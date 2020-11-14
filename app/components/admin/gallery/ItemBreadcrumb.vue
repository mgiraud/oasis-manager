<template>
  <v-row>
    <span v-for="(step, index) in breadcrumb" :key="step.id + step.name">
      <nuxt-link v-if="index === 0 && breadcrumb.length > 1" :to="`/admin/gallery/${step.id}`">{{ step.name }}</nuxt-link>
      <span v-else-if="index === 0 && breadcrumb.length === 1">{{ step.name }}</span>
      <nuxt-link v-else-if="index > 0 && breadcrumb.length - 1 > index" :to="`/admin/gallery/folders/${step.id}`">{{ step.name }}</nuxt-link>
      <span v-else>{{ step.name }}</span>
      <span v-if="index < breadcrumb.length - 1">&nbsp;>&nbsp;</span>
    </span>
  </v-row>
</template>

<script>

export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
