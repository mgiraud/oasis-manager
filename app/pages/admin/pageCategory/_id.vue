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
          :handle-delete="del"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item.name }}
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
import Form from '~/components/admin/pageCategory/Form.vue'
import update from '~/mixins/update'
import { PageCategory } from '~/store/page_category'
import { HydraMemberObject } from '~/api/hydra'

const pageCategoryModule = namespace('page_category')

@Component({
  components: {
    Loading, Toolbar, Form
  },
  mixins: [update],
  servicePrefix: 'admin-pageCategory',
  resourcePrefix: '/api/page_categories/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGE_CATEGORIES']
  }
})
export default class AdminPageCategoryEdit extends mixins(update) {
  @pageCategoryModule.State('updated') updated!: PageCategory | null
  @pageCategoryModule.State('error') error!: string | null
  @pageCategoryModule.State('isLoading') isLoading!: boolean
  @pageCategoryModule.State('violations') violations!: string[]

  @pageCategoryModule.Getter('find') find!: (id: string) => PageCategory | null

  @pageCategoryModule.Action('resetCreate') createReset!: () => void
  @pageCategoryModule.Action('resetDelete') delReset!: () => void
  @pageCategoryModule.Action('load') retrieve!: (id: string) => HydraMemberObject | null
  @pageCategoryModule.Action('update') update!: (pageCateogry: PageCategory) => Promise<PageCategory>
  @pageCategoryModule.Action('resetUpdate') updateReset!: () => void
}
</script>
