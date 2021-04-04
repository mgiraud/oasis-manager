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
import Form from '~/components/admin/page/Form.vue'
import { Page } from '~/store/page'
import CreateMixin from '~/mixins/create'

const pageModule = namespace('page')

@Component({
  components: {
    Loading, Toolbar, Form
  },
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  }
})
export default class AdminPageNew extends mixins(CreateMixin) {
  item = { content: '', showInMenu: false, isPublished: false }

  @pageModule.State('created') created!: Page | null
  @pageModule.State('error') error!: string | null
  @pageModule.State('isLoading') isLoading!: boolean
  @pageModule.State('violations') violations!: string[]

  @pageModule.Action('create') create!: (page: Page) => Promise<Page>
  @pageModule.Action('reset') reset!: () => void
}
</script>
