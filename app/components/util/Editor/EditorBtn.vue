<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
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

<script>
export default {
  props: {
    btnClass: {
      type: Object,
      required: false,
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
  },
  data: () => ({
    editor: null
  })
}
</script>
