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
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class EditorBtn extends Vue {
  @Prop({ type: Object, required: false, default: null }) readonly btnClass!: any
  @Prop({ type: Function, required: true }) readonly clickHandler!: any
  @Prop({ type: String, required: true }) readonly icon!: string
  @Prop({ type: String, required: true }) readonly label!: string
}
</script>
