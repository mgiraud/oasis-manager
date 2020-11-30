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

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AdminPageFilter',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('member_group', {
      groupsSelectItems: 'selectItems'
    }),
    item () {
      return this.initialValues || this.values
    }
  },
  mounted () {
    this.groupsGetSelectItems()
  },
  methods: {
    ...mapActions({
      groupsGetSelectItems: 'member_group/fetchSelectItems'
    })
  }
}
</script>
