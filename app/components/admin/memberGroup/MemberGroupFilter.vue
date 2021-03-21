<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.name"
          label="Le nom contient..."
          type="text"
        />
      </v-col>
      <!--      <v-col cols="12" sm="6" md="6">-->
      <!--        <v-combobox-->
      <!--          v-model="item.permissions"-->
      <!--          :items="Object.keys(permissions)"-->
      <!--          label="Ayant la permission"-->
      <!--          clearable-->
      <!--          multiple-->
      <!--        />-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'

const securityModule = namespace('security')

@Component
export default class MemberGroupFilter extends Vue {
  @Prop({ type: Object, required: true }) readonly values!: any
  @securityModule.Action('permissions') permissions !: () => string[]

  get item () {
    return this.values
  }
}
</script>
