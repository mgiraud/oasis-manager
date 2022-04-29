<template>
  <div>
    <Form
      ref="createForm"
      :values="item"
      :errors="state.violations"
    />
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    />
    <Loading :visible="state.isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, useContext } from '@nuxtjs/composition-api'
import Loading from '../../../components/util/Loading.vue'
import Toolbar from '../../../components/form/Toolbar.vue'
import Form from '../../../components/admin/member/Form.vue'
import itemCreate from '../../../composable/ItemCreate'
import { memberStore } from '../../../custom-store/MemberStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_MEMBERS']
  },
  setup () {
    const item = reactive({ content: null })
    memberStore.setContext(useContext())

    return {
      item,
      ...toRefs(itemCreate(memberStore))
    }
  }
})
</script>
