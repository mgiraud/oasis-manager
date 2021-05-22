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
          :handle-delete="null"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item['url'] }}
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
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/member/Form.vue'
import update from '~/mixins/update'
import { Member } from '~/store/member'
import { HydraMemberObject } from '~/api/hydra'

const memberModule = namespace('member')

@Component({
  components: {
    Loading, Toolbar, Form
  },
  servicePrefix: 'admin-member',
  resourcePrefix: '/api/members/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBERS']
  }
})
export default class AdminMemberEdit extends mixins(update) {
  @memberModule.State('updated') updated!: Member | null
  @memberModule.State('error') error!: string | null
  @memberModule.State('isLoading') isLoading!: boolean
  @memberModule.State('violations') violations!: string[]

  @memberModule.Getter('find') find!: (id: string) => Member | null

  get canDelete () {
    return this.hasPermission('USER_CAN_DELETE_MEMBERS')
  }

  @memberModule.Action('resetCreate') createReset!: () => void
  @memberModule.Action('resetDelete') delReset!: () => void
  @memberModule.Action('load') retrieve!: (id: string) => HydraMemberObject | null
  @memberModule.Action('update') update!: (member: Member) => Promise<Member>
  @memberModule.Action('resetUpdate') updateReset!: () => void
}
</script>
