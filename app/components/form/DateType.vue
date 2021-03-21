<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="ri-calendar-2-line"
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" @input="handleInput" />
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DateType extends Vue {
  @Prop({ type: String, required: false, default: '' }) readonly label!: any
  @Prop({ type: String, required: false, default: null }) readonly value!: any

  date = new Date().toISOString().substr(0, 10)
  showMenu = false

  created () {
    this.date = this.value || this.date
  }

  handleInput () {
    this.showMenu = false
    this.$emit('input', this.date)
  }
}
</script>
