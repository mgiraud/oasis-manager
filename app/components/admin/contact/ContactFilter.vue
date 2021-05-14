<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
            v-model="item.email"
            label="L'email contient..."
            type="text"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
            v-model="item.firstName"
            label="Le prénom contient..."
            type="text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ContactFilter extends Vue {
  @Prop({ type: Object, required: true }) readonly values!: any

  get item () {
    return this.values
  }
}
</script>
