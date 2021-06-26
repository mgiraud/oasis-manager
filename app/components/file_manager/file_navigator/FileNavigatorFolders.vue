<template>
  <v-container>
    <v-row>
      <v-col
        v-for="child in mediaNode.children"
        :key="child['@id']"
      >
        <v-btn @click="handleClick(child['@id'])">
          {{ child.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    mediaNode: {
      type: Object,
      required: true
    },
    handleClick: {
      type: Function,
      required: true
    }
  }
})
</script>
