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
        <v-checkbox
          v-model="item.isPublished"
          label="Est publié"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <FormDateType
          v-model="item['createdAt[before]']"
          label="Créé avant le"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <FormDateType
          v-model="item['createdAt[after]']"
          label="Créé après le"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-combobox
          v-if="categorySelectItems"
          v-model="item.category"
          :items="categorySelectItems"
          no-data-text="Aucune catégorie"
          label="Dans la catégorie..."
          item-text="name"
          item-value="@id"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.title"
          label="Le titre contient..."
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
