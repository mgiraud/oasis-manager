<template>
  <v-card
    outlined
    tile
  >
    <v-card-title>
      {{ page.title }}
    </v-card-title>
    <v-card-text v-html="page.content" />
  </v-card>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>
