<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" @input="handleInput" />
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: () => ''
    },
    value: {
      type: String,
      default: null
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    showMenu: false
  }),
  created () {
    this.date = this.value || this.date
  },
  methods: {
    handleInput () {
      this.showMenu = false
      this.$emit('input', this.date)
    }
  }
}
</script>
