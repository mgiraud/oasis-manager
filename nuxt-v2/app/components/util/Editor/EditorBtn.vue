<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn
        small
        :class="btnClass"
        v-bind="attrs"
        @click="clickHandler"
        v-on="on"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    btnClass: {
      type: Object,
      default: null
    },
    clickHandler: {
      type: Function,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
})
</script>
