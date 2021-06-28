<template>
  <div class="text-center">
    <v-overlay :value="visible">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
})
</script>
