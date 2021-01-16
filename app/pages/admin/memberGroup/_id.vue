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
          :handle-delete="canDeleteGroup ? del : null"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edition du groupe "{{ item['name'] }}"
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
import Form from '../../../components/admin/memberGroup/Form'
import update from '~/mixins/update'

export default {
  components: {
    Loading, Toolbar, Form
  },
  mixins: [update],
  servicePrefix: 'admin-memberGroup',
  resourcePrefix: '/api/member_groups/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBER_GROUPS']
  },
  computed: {
    ...mapFields('member_group', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('member_group', ['find']),
    canDeleteGroup () {
      return this.hasPermission('USER_CAN_DELETE_MEMBER_GROUPS')
    }
  },
  methods: {
    ...mapActions('member_group', {
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
