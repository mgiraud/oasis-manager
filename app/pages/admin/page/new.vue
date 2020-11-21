<template>
  <div>
    <AdminPageForm ref="createForm" :values="item" :errors="violations" />
    <FormToolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <UtilLoading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import create from '~/mixins/create'
const { mapFields } = createHelpers({
  getterType: 'page/getField',
  mutationType: 'page/updateField'
})
export default {
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  mixins: [create],
  data: () => ({
    item: {
      content: null
    }
  }),
  computed: {
    ...mapFields(['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('page', ['create', 'reset'])
  }
}
</script>
