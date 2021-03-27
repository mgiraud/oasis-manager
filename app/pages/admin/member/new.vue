<template>
  <div>
    <Form ref="createForm" :values="item" :errors="violations" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/member/Form.vue'
import create from '~/mixins/create'
import { Member } from '~/store/member'

const memberModule = namespace('member')

@Component({
  components: {
    Loading, Toolbar, Form
  },
  servicePrefix: 'admin-member',
  resourcePrefix: '/api/member/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBERS']
  }
})
export default class AdminMemberNew extends mixins(create) {
  item = {}

  @memberModule.State('created') created!: Member | null
  @memberModule.State('error') error!: string | null
  @memberModule.State('isLoading') isLoading!: boolean
  @memberModule.State('violations') violations!: string[]

  @memberModule.Action('create') create!: (member: Member) => Member
  @memberModule.Action('reset') reset!: () => void
}
</script>
