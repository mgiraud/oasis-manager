<template>
  <v-container fluid>
    {{groups}}
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-text-field
          v-model="item.email"
          label="Email du membre"
          type="text"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <v-text-field
          v-model="item.nickname"
          label="Le pseudo du membre"
          type="text"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        {{item.groups}}
        <v-combobox
          v-if="memberGroupState.selectItems"
          v-model="item.groups"
          :items="memberGroupState.selectItems"
          label="Dans le groupe"
          item-text="name"
          item-value="name"
          clearable
          :return-object="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { memberGroupStore } from '~/store/MemberGroupStore'
import { Member } from '~/store/MemberStore'

export default defineComponent({
  props: {
    values: {
      type: Object as () => Member,
      required: true
    },
  },
  setup (props: any[]) {
    const item = ref(props.values)
    memberGroupStore.setContext(useContext())

    onMounted(() => {
      memberGroupStore.fetchSelectItems()
    })

    return {
      item,
      memberGroupState: memberGroupStore.getState()
    }
  }
})
</script>
