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
        <AdminPageCategoryForm
          v-if="item"
          ref="updateForm"
          :values="item"
          :errors="violations"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <FormToolbar
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
        </FormToolbar>
      </v-col>
    </v-row>
    <UtilLoading :visible="deleteLoading" />
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import update from '~/mixins/update'

export default {
  mixins: [update],
  servicePrefix: 'admin-pageCategory',
  resourcePrefix: '/api/page_categories/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGE_CATEGORIES']
  },
  computed: {
    ...mapFields('page_category', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('page_category', ['find'])
  },
  methods: {
    ...mapActions('page_category', {
      createReset: 'resetCreate',
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
      update: 'update',
      updateReset: 'resetUpdate'
    })
  }
}
</script>
