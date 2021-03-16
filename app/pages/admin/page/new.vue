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
import Loading from '../../../components/util/Loading'
import Toolbar from '../../../components/form/Toolbar'
import Form from '../../../components/admin/page/Form'
import create from '~/mixins/create'

export default {
  components: {
    Loading, Toolbar, Form
  },
  servicePrefix: 'admin-page',
  resourcePrefix: '/api/pages/',
  mixins: [create],
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },
  data: () => ({
    item: {
      content: ''
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
