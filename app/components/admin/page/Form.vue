<template>
  <v-form>
    <v-text-field
      v-model="item.title"
      label="Titre"
    />
  </v-form>
</template>

<script>
export default {
  name: 'ConfirmDelete',
  props: {
    values: {
      type: Object,
      required: true,
      default: () => {}
    },
    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    item () {
      return this.initialValues || this.values
    }
  }
}
</script>
