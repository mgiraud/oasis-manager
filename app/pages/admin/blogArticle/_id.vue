<template>
  <v-container>
    <v-row v-if="error">
      <v-col cols="12">
        <v-alert
          type="error"
        >
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Form
          v-if="item"
          ref="updateForm"
          :values="item"
          :errors="violations"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Toolbar
          :handle-submit="onSendForm"
          :handle-reset="resetForm"
          :handle-delete="canDeletePage ? del : null"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item['url'] }}
            </h1>
          </template>
        </Toolbar>
      </v-col>
    </v-row>
    <Loading :visible="isLoading" />
  </v-container>
</template>
<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/blogArticle/Form.vue'
import update from '~/mixins/update'
import { BlogArticle } from '~/store/blog_article'

const blogArticleModule = namespace('page')

@Component({
  components: {
    Loading, Toolbar, Form
  },
  servicePrefix: 'admin-blogArticle',
  resourcePrefix: '/api/blog_articles/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_BLOG_ARTICLES']
  }
})
export default class AdminPageEdit extends mixins(update) {
  @blogArticleModule.State('updated') updated!: BlogArticle | null
  @blogArticleModule.State('error') error!: string | null
  @blogArticleModule.State('isLoading') isLoading!: boolean
  @blogArticleModule.State('violations') violations!: string[]

  @blogArticleModule.Getter('find') find!: (id: string) => BlogArticle | null
  get canDeletePage () {
    return this.hasPermission('USER_CAN_DELETE_PAGES')
  }

  @blogArticleModule.Action('resetCreate') createReset!: () => void
  @blogArticleModule.Action('resetDelete') delReset!: () => void
  @blogArticleModule.Action('load') retrieve!: (id: string) => void
  @blogArticleModule.Action('update') update!: (article: BlogArticle) => Promise<BlogArticle>
  @blogArticleModule.Action('resetUpdate') updateReset!: () => void
}
</script>
