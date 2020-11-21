<template>
  <div>
    <v-card-title class="primary--text text--darken-4">
      {{ page.title | capitalize }}
    </v-card-title>
    <v-card-text v-html="page.content" />
  </div>
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
