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
    <v-date-picker
      v-model="date"
      @input="handleInput"
    />
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => null
    }
  },
  setup (props, { emit }) {
    const date = ref(props.value)
    const showMenu = ref(false)
    const handleInput = () => {
      showMenu.value = false
      emit('input', date.value)
    }

    return {
      date,
      showMenu,
      handleInput
    }
  }
})
</script>
