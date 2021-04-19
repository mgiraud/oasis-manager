<template>
  <v-container fluid>
    <v-row>
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
          v-if="item.tags"
          v-model="item.tags"
          :items="item.tags"
          no-data-text="Aucun tag"
          label="Avec le tag"
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import DateType from '~/components/form/DateType.vue'

@Component({
  components: {
    DateType
  }
})
export default class BlogArticleFilter extends Vue {
  @Prop({ type: Object, required: true }) readonly values!: any

  get item () {
    return this.values
  }
}
</script>
