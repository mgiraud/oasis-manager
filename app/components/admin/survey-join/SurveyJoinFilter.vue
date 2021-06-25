<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.email"
          label="L'email contient..."
          type="text"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.firstName"
          label="Le prénom contient..."
          type="text"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.lastName"
          label="Le nom contient..."
          type="text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

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
