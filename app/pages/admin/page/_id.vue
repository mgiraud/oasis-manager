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
import Form from '~/components/admin/page/Form.vue'
import update from '~/mixins/update'
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
export default class AdminPageEdit extends mixins(update) {
  @pageModule.State('updated') updated!: Page | null
  @pageModule.State('error') error!: string | null
  @pageModule.State('isLoading') isLoading!: boolean
  @pageModule.State('violations') violations!: string[]

  @pageModule.Getter('find') find!: (id: string) => Page | null
  get canDeletePage () {
    return this.hasPermission('USER_CAN_DELETE_PAGES')
  }

  @pageModule.Action('resetCreate') createReset!: () => void
  @pageModule.Action('resetDelete') delReset!: () => void
  @pageModule.Action('load') retrieve!: (id: string) => void
  @pageModule.Action('update') update!: (pageCateogry: Page) => Promise<Page>
  @pageModule.Action('resetUpdate') updateReset!: () => void
}
</script>
