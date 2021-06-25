<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-checkbox
          v-model="item.showInMenu"
          label="Visible dans le menu"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-checkbox
          v-model="item.isPublished"
          label="Est publié"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="item.name"
          label="Le nom contient..."
          type="text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const item = ref(props.values)

    return {
      item
    }
  }
})
</script>
