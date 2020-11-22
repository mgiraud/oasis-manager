<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-checkbox
          v-model="item.showInMenu"
          label="Show in menu"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-checkbox
          v-model="item.isPublished"
          label="Publication"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <FormDateType
          v-model="item.createdAt"
          label="Créé le "
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-combobox
          v-if="categorySelectItems"
          v-model="item.category"
          :items="categorySelectItems"
          no-data-text="Aucune catégorie"
          label="category"
          item-text="name"
          item-value="@id"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.title"
          label="title"
          type="text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  async fetch () {
    return await this.categoryGetSelectItems()
  },
  computed: {
    ...mapState('page_categories', {
      categorySelectItems: 'selectItems'
    }),
    item () {
      return this.initialValues || this.values
    }
  },
  methods: {
    ...mapActions({
      categoryGetSelectItems: 'page_categories/fetchSelectItems'
    })
  }
}
</script>
