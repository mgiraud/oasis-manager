<template>
  <div>
    <AdminPageCategoryForm ref="createForm" :values="item" :errors="violations" />
    <FormToolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <UtilLoading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import create from '~/mixins/create'

export default {
  servicePrefix: 'admin-pageCategory',
  resourcePrefix: '/api/page_categories/',
  mixins: [create],
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGE_CATEGORIES']
  },
  data: () => ({
    item: {
      content: null
    }
  }),
  computed: {
    ...mapFields('page_category', ['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('page_category', ['create', 'reset'])
  }
}
</script>
