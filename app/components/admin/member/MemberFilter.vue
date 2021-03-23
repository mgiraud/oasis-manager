<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.email"
          label="Email du membre"
          type="text"
        />
      </v-col>

      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.nickname"
          label="Le pseudo du membre"
          type="text"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-combobox
          v-if="groupsSelectItems"
          v-model="item.groups"
          :items="groupsSelectItems"
          label="Dans le groupe"
          item-text="name"
          item-value="name"
          clearable
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import { MemberGroup } from '~/store/member_group'

const memberGroupModule = namespace('member_group')

@Component
export default class MemberFilter extends Vue {
  @Prop({ type: Object, required: true }) readonly values!: any
  @memberGroupModule.State('selectItems') groupsSelectItems !: MemberGroup[]
  @memberGroupModule.Action('fetchSelectItems') groupsGetSelectItems !: () => MemberGroup[]

  get item () {
    return this.values
  }

  mounted () {
    this.groupsGetSelectItems()
  }
}
</script>
