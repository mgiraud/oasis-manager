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
    <Loading :visible="deleteLoading" />
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import Loading from '../../../components/util/Loading'
import Toolbar from '../../../components/form/Toolbar'
import Form from '../../../components/admin/page/Form'
import update from '~/mixins/update'

export default {
  components: {
    Loading, Toolbar, Form
  },
  mixins: [update],
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },
  computed: {
    ...mapFields('page', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('page', ['find']),
    canDeletePage () {
      return this.hasPermission('USER_CAN_DELETE_PAGES')
    }
  },
  methods: {
    ...mapActions('page', {
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
