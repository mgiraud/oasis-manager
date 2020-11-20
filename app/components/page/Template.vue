<template>
  <v-card
    outlined
    tile
  >
    <v-card-title class="justify-center">
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
