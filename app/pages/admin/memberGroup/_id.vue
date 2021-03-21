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
    <Loading :visible="isLoading" />
  </v-container>
</template>
<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import Loading from '~/components/util/Loading'
import Toolbar from '~/components/form/Toolbar'
import Form from '~/components/admin/memberGroup/Form'
import update from '~/mixins/update'
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
export default class AdminMemberGroupEdit extends mixins(update) {
  @memberGroupModule.State('updated') updated!: MemberGroup | null
  @memberGroupModule.State('error') error!: string | null
  @memberGroupModule.State('isLoading') isLoading!: boolean
  @memberGroupModule.State('violations') violations!: string[]

  @memberGroupModule.Getter('find') find!: (id: string) => MemberGroup | null

  get canDeleteGroup () {
    return this.hasPermission('USER_CAN_DELETE_MEMBER_GROUPS')
  }

  @memberGroupModule.Action('resetCreate') createReset!: () => void
  @memberGroupModule.Action('resetDelete') delReset!: () => void
  @memberGroupModule.Action('load') retrieve!: (id: string) => void
  @memberGroupModule.Action('update') update!: (memberGroup: MemberGroup) => MemberGroup
  @memberGroupModule.Action('resetUpdate') updateReset!: () => void
}
</script>
