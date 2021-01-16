<template>
  <div>
    <Form ref="createForm" :values="item" :errors="violations" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import Form from '../../../components/admin/pageCategory/Form'
import Toolbar from '../../../components/form/Toolbar'
import Loading from '../../../components/util/Loading'
import create from '~/mixins/create'

export default {
  components: {
    Form, Toolbar, Loading
  },
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
