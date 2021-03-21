<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :multi-line="true"
    :timeout="timeout"
    bottom
  >
    {{ text }}
    <template v-if="subText">
      <p>{{ subText }}</p>
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
import { Component, namespace, Vue } from 'nuxt-property-decorator'

const notificationModule = namespace('notifications')

@Component
export default class Alert extends Vue {
  @notificationModule.State('color') color!: string;
  @notificationModule.State('text') text!: string;
  @notificationModule.State('subText') subText!: string;
  @notificationModule.State('show') show!: boolean;
  @notificationModule.State('timeout') timeout!: number;

  @notificationModule.Action('setShow') setShow!: (show: boolean) => void

  close () {
    this.setShow(false)
  }
}
</script>
