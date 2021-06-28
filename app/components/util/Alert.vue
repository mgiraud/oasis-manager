<template>
  <v-snackbar
    v-model="notificationState.show"
    :color="notificationState.color"
    :multi-line="true"
    :timeout="notificationState.timeout"
    bottom
  >
    {{ notificationState.text }}
    <template v-if="notificationState.subText">
      <p>{{ notificationState.subText }}</p>
    </template>

    <template #action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="close"
      >
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { notificationStore } from '~/custom-store/NotificationStore'

export default defineComponent({
  setup () {
    return {
      notificationState: notificationStore.getState()
    }
  },
  methods: {
    close () {
      notificationStore.setShow(false)
    }
  }
})
</script>
