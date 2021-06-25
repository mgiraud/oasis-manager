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
        Filtres <v-icon right>
          ri-filter-line
        </v-icon>
      </v-btn>
    </template>

    <v-sheet>
      <v-card-title>Filtres</v-card-title>

      <slot name="filter" />

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" @click="onFilter">
          Filtrer
        </v-btn>
        <v-btn color="primary" class="ml-2" text @click="onCancel">
          Remise à zéro
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    handleReset: {
      type: Function,
      required: true
    },
    handleFilter: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const onFilter = () => {
      props.handleFilter()
    }

    const onCancel = () => {
      props.handleReset()
    }

    return {
      onFilter,
      onCancel
    }
  }
})
</script>
