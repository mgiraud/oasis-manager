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
          :page-logs="pageLogs"
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
import { Component, mixins, namespace, Watch } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/page/Form.vue'
import update from '~/mixins/update'
import { Page } from '~/store/page'
import { PageLog, PageLogPayload } from '~/store/page_log'
import { MUTATIONS } from '~/store/crud'
import { HydraMemberObject } from '~/api/hydra'

const pageModule = namespace('page')
const pageLogModule = namespace('page_log')

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
  @pageModule.Action('load') retrieve!: (id: string) => HydraMemberObject | null
  @pageModule.Action('update') update!: (page: Page) => Promise<Page>
  @pageModule.Action('resetUpdate') updateReset!: () => void

  @pageLogModule.Action('fetchAll') getLogs!: (options: {[name: string]: string}) => PageLog[]
  @pageLogModule.Action('create') createLog !: (log: PageLogPayload) => Promise<PageLog>
  @pageLogModule.Getter('list') pageLogs !: () => PageLog[]
  @pageLogModule.Mutation(MUTATIONS.RESET_LIST) resetLogList!: () => void

  autoSaveInterval: number | null = null

  @Watch('retrieved')
  onRetrieved (val: Page) {
    this.item = { ...val }
    if (this.item) {
      this.loadLogs()
    }
  }

  @Watch('updated')
  onPageUpdated (val: HydraMemberObject) {
    if (val) {
      this.loadLogs()
    }
  }

  loadLogs () {
    if (this.item) {
      this.resetLogList()
      this.getLogs({
        'page.url': (this.item as Page).url,
        'order[updatedAt]': 'desc'
      })
    }
  }

  autoSave () {
    this.createLog({
      originalContent: (this.item as Page).content,
      draft: true,
      page: (this.item as Page)['@id']
    }).then(() => {
      this.loadLogs()
    })
  }

  mounted () {
    if (process.client) {
      this.autoSaveInterval = window.setInterval(this.autoSave, 120000)
    }
  }

  beforeDestroy () {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
    }
    this.autoSaveInterval = null
  }
}
</script>
