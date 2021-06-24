<template>
  <v-menu
    transition="slide-y-transition"
    :close-on-content-click="false"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="white"
        v-bind="attrs"
        v-on="on"
      >
        Filter <v-icon right>
          ri-filter-line
        </v-icon>
      </v-btn>
    </template>

    <v-sheet>
      <v-card-title>Filters</v-card-title>

      <slot name="filter" />

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" @click="onFilter">
          Filter
        </v-btn>
        <v-btn color="primary" class="ml-2" text @click="onCancel">
          Remise à zéro
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FormFilter extends Vue {
  @Prop({ type: Function, required: true })
  handleReset!: any

  @Prop({ type: Function, required: true })
  handleFilter!: any

  onFilter () {
    this.handleFilter()
  }

  onCancel () {
    this.handleReset()
  }
}
</script>
