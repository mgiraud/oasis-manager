<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-checkbox
          v-model="item.showInMenu"
          label="Visible dans le menu"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-checkbox
          v-model="item.isPublished"
          label="Est publié"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <DateType
          v-model="item['createdAt[before]']"
          label="Créé avant le"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <DateType
          v-model="item['createdAt[after]']"
          label="Créé après le"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-combobox
          v-if="pageState.selectItems"
          v-model="item.category"
          :items="pageState.selectItems"
          no-data-text="Aucune catégorie"
          label="Dans la catégorie..."
          item-text="name"
          item-value="@id"
          clearable
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
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
import { computed, defineComponent, useContext, useFetch, watch } from '@nuxtjs/composition-api'
import DateType from '../../form/DateType.vue'
import { pageCategoryStore } from '../../../custom-store/PageCategoryStore'

export default defineComponent({
  components: {
    DateType
  },
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const item = computed(() => props.values)

    pageCategoryStore.setContext(useContext())
    useFetch(async () => {
      await pageCategoryStore.fetchSelectItems()
    })

    return {
      pageState: pageCategoryStore.getState(),
      item
    }
  }
})
</script>
