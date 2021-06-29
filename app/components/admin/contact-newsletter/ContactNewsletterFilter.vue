<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="item.email"
          label="L'email contient..."
          type="text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import filterComponent from '~/composable/filter/filterComponent'

export default defineComponent(filterComponent)
</script>
