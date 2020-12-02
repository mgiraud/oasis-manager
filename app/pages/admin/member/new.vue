<template>
  <div>
    <AdminMemberForm ref="createForm" :values="item" :errors="violations" />
    <FormToolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <UtilLoading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import create from '~/mixins/create'

export default {
  servicePrefix: 'admin-memberGroup',
  resourcePrefix: '/api/member_groups/',
  mixins: [create],
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBER_GROUPS']
  },
  data: () => ({
    item: {
      content: null
    }
  }),
  computed: {
    ...mapFields('member', ['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('member', ['create', 'reset'])
  }
}
</script>
