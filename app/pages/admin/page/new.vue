<template>
  <div>
    <Form ref="createForm" :values="item" :errors="violations" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading'
import Toolbar from '~/components/form/Toolbar'
import Form from '~/components/admin/page/Form'
import create from '~/mixins/create'
import { Page } from '~/store/page'

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
export default class AdminPageCategoryNew extends mixins(create) {
  item = { content: '' }

  @pageModule.State('created') created!: Page | null
  @pageModule.State('error') error!: string | null
  @pageModule.State('isLoading') isLoading!: boolean
  @pageModule.State('violations') violations!: string[]

  @pageModule.Action('create') create!: (page: Page) => Page
  @pageModule.Action('reset') reset!: () => void
}
</script>
