<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.name"
          label="Le nom contient..."
          type="text"
        />
      </v-col>
      <!--      <v-col cols="12" sm="6" md="6">-->
      <!--        <v-combobox-->
      <!--          v-model="item.permissions"-->
      <!--          :items="Object.keys(permissions)"-->
      <!--          label="Ayant la permission"-->
      <!--          clearable-->
      <!--          multiple-->
      <!--        />-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdminPageCategoryFilter',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('security', ['permissions']),
    item () {
      return this.initialValues || this.values
    }
  }
}
</script>
