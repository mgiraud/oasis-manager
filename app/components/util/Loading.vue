<template>
  <div class="text-center">
    <v-overlay :value="visible">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop({ type: Boolean, required: true }) readonly visible!: boolean
}
</script>
