<template>
  <div>
    <Form ref="createForm" :values="item" :errors="violations" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/blogArticle/Form.vue'
import { BlogArticle } from '~/store/blog_article'
import CreateMixin from '~/mixins/create'

const blogArticleModule = namespace('blog_article')

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
export default class AdminBlogArticleNew extends mixins(CreateMixin) {
  item = { content: '', showInMenu: false, isPublished: false }

  @blogArticleModule.State('created') created!: BlogArticle | null
  @blogArticleModule.State('error') error!: string | null
  @blogArticleModule.State('isLoading') isLoading!: boolean
  @blogArticleModule.State('violations') violations!: string[]

  @blogArticleModule.Action('create') create!: (blogArticle: BlogArticle) => Promise<BlogArticle>
  @blogArticleModule.Action('reset') reset!: () => void
}
</script>
