<template>
  <div>
    <AdminPageForm ref="createForm" :values="item" :errors="violations" />
    <FormToolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <UtilLoading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import create from '~/mixins/create'

export default {
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  mixins: [create],
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },
  data: () => ({
    item: {
      content: null
    }
  }),
  computed: {
    ...mapFields('page', ['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('page', ['create', 'reset'])
  }
}
</script>
