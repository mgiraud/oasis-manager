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
        <AdminMemberForm
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
          :handle-delete="canDeleteGroup ? del : null"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item['url'] }}
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
  servicePrefix: 'admin-member',
  resourcePrefix: '/api/members/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBERS']
  },
  computed: {
    ...mapFields('member', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('member', ['find']),
    canDeleteGroup () {
      return this.hasPermission('USER_CAN_DELETE_MEMBERS')
    }
  },
  methods: {
    ...mapActions('member', {
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
