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
        <DateType
          v-model="item['createdAt[before]']"
          label="Créé avant le"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <DateType
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

<script lang="ts">
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import DateType from '~/components/form/DateType'
import { PageCategory } from '~/store/page_category'

const pageCategoryModule = namespace('page_category')

@Component({
  components: {
    DateType
  }
})
export default class PageFilter extends Vue {
  @Prop({ type: Object, required: true }) readonly values!: any

  async fetch () {
    return await this.categoryGetSelectItems()
  }

  @pageCategoryModule.State('selectItems') categorySelectItems !: PageCategory[]
  @pageCategoryModule.Action('fetchSelectItems') categoryGetSelectItems !: () => PageCategory[]

  get item () {
    return this.values
  }
}
</script>
