<template>
  <div>
    <Form ref="createForm" :values="item" :errors="violations" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading'
import Toolbar from '~/components/form/Toolbar'
import Form from '~/components/admin/memberGroup/Form'
import create from '~/mixins/create'
import { MemberGroup } from '~/store/member_group'

const memberGroupModule = namespace('member_group')

@Component({
  components: {
    Loading, Toolbar, Form
  },
  servicePrefix: 'admin-memberGroup',
  resourcePrefix: '/api/member_groups/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBER_GROUPS']
  }
})
export default class AdminMemberGroupNew extends mixins(create) {
  item = {}

  @memberGroupModule.State('created') created!: MemberGroup | null
  @memberGroupModule.State('error') error!: string | null
  @memberGroupModule.State('isLoading') isLoading!: boolean
  @memberGroupModule.State('violations') violations!: string[]

  @memberGroupModule.Action('create') create!: (memberGroup: MemberGroup) => MemberGroup
  @memberGroupModule.Action('reset') reset!: () => void
}
</script>
