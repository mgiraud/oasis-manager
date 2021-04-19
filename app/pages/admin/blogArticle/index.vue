<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :items-per-page.sync="options.itemsPerPage"
      :loading="isLoading"
      loading-text="Loading..."
      :options.sync="options"
      :server-items-length="totalItems"
      class="elevation-1"
      item-key="@id"
      show-select
      @update:options="onUpdateOptions"
    >
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>BlogArticle</v-toolbar-title>

          <v-spacer />

          <FormFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
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
        :handle-edit="canEditBlogArticle ? () => editHandler(props.item) : null"
        :handle-delete="canDeleteBlogArticle ? () => deleteHandler(props.item) : null"
      />
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Store } from 'vuex'
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import ActionCell from '~/components/table/ActionCell.vue'
import BlogArticleFilter from '~/components/admin/blogArticle/BlogArticleFilter.vue'
import FormFilter from '~/components/form/FormFilter.vue'
import list from '~/mixins/list'
import { BlogArticle } from '~/store/blog_article'
import { MUTATIONS } from '~/store/crud'
import { HydraGetRequestFilter } from '~/api/hydra'

const blogArticleModule = namespace('blog_article')

@Component({
  components: {
    ActionCell, BlogArticleFilter, FormFilter
  },
  servicePrefix: 'admin-blogArticle',
  resourcePrefix: '/api/blog_articles/',
  layout: 'Admin',
  middleware: 'hasPermissions',
  fetchOnServer: false,
  meta: {
    permissions: ['USER_CAN_ACCESS_BLOG_ARTICLES']
  }
})
export default class AdminBlogArticleIndex extends mixins(list) {
  selected = []
  headers = [
    { text: 'Title', value: 'title' },
    { text: 'Tags', value: 'tags' },
    { text: 'est publié', value: 'isPublished' },
    { text: 'créé par', value: 'createdBy.nickname' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

    options: HydraGetRequestFilter = {
      sortBy: ['createdAt'],
      sortDesc: ['desc']
    }

    @blogArticleModule.Getter('list') items !: () => BlogArticle
    @blogArticleModule.State('deleted') deletedItem!: BlogArticle | null
    @blogArticleModule.State('error') error!: string | null
    @blogArticleModule.State('isLoading') isLoading!: boolean
    @blogArticleModule.State('totalItems') totalItems!: number
    @blogArticleModule.Mutation(MUTATIONS.RESET_LIST) resetList!: (reset: boolean) => void

    get canEditBlogArticle () {
      return this.hasPermission('USER_CAN_EDIT_BLOG_ARTICLES')
    }

    get canDeleteBlogArticle () {
      return this.hasPermission('USER_CAN_DELETE_BLOG_ARTICLES')
    }

    @blogArticleModule.Action('fetchAll') fetchAll!: () => BlogArticle[]
    @blogArticleModule.Action('del') deleteItem!: (BlogArticle: BlogArticle) => Promise<void>
}
</script>
