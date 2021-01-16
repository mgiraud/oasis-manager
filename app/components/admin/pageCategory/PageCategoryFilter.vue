<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-checkbox
          v-model="item.showInMenu"
          label="Visible dans le menu"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.name"
          label="Le nom contient..."
          type="text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AdminPageCategoryFilter',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  computed: {
    item () {
      return this.initialValues || this.values
    }
  }
}
</script>
