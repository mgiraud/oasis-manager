<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :items-per-page.sync="filterOptions.itemsPerPage"
      :loading="state.isLoading"
      loading-text="Loading..."
      :options.sync="filterOptions"
      :server-items-length="state.totalItems"
      class="elevation-1"
      item-key="@id"
      show-select
      @update:options="onUpdateOptions"
    >
      <template #top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>BlogArticle</v-toolbar-title>

          <v-spacer />

          <FormFilter
            :handle-filter="onSendFilter"
            :handle-reset="resetFilter"
          >
            <BlogArticleFilter
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </FormFilter>

          <v-btn
            color="primary"
            dark
            class="ml-2"
            @click="addHandler"
          >
            New Item
          </v-btn>
        </v-toolbar>
      </template>
      <ActionCell
        slot="item.actions"
        slot-scope="props"
        :handle-edit="canEdit ? () => editHandler(props.item) : null"
        :handle-delete="canDelete ? () => deleteHandler(props.item) : null"
      />
      <template
        v-if="item"
        slot="item.createdAt"
        slot-scope="{ item }"
      >
        {{ formatDate(item.createdAt) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs, useContext, useFetch } from '@nuxtjs/composition-api'
import ActionCell from '../../../components/table/ActionCell.vue'
import BlogArticleFilter from '../../../components/admin/blog-article/BlogArticleFilter.vue'
import FormFilter from '../../../components/form/FormFilter.vue'
import itemList from '../../../composable/ItemList'
import itemSecurity from '../../../composable/itemSecurity'
import { blogArticleStore } from '../../../custom-store/BlogArticleStore'
import { formatDate } from '../../../composable/helpers/formatDate'

const headers = [
  { text: 'Title', value: 'title' },
  { text: 'Tags', value: 'tags' },
  { text: 'est publié', value: 'isPublished' },
  { text: 'créé le', value: 'createdAt' },
  { text: 'créé par', value: 'createdBy.nickname' },
  { text: 'Actions', value: 'actions', sortable: false }
]

export default defineComponent({
  components: {
    ActionCell, BlogArticleFilter, FormFilter
  },
  layout: 'admin',
  middleware: 'hasPermissions',
  setup () {
    blogArticleStore.setContext(useContext())

    useFetch(async () => {
      await blogArticleStore.fetchAll()
    })

    return {
      ...toRefs(itemList(blogArticleStore, {
        sortBy: ['createdAt'],
        sortDesc: ['desc']
      })),
      ...toRefs(itemSecurity(blogArticleStore)),
      headers,
      formatDate
    }
  },
  head () {
    return {
      title: 'Administration - Liste des articles de blog'
    }
  },
  meta: {
    permissions: ['USER_CAN_ACCESS_BLOG_ARTICLES']
  }
})
</script>
