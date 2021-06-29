<template>
  <div>
    <Form
      ref="createForm"
      :values="item"
      :errors="state.violations"
      :page-logs="[]"
    />
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    />
    <Loading :visible="state.isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, toRefs, reactive } from '@nuxtjs/composition-api'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/page/Form.vue'
import itemCreate from '~/composable/ItemCreate'
import { pageStore } from '~/custom-store/PageStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },
  setup () {
    const item = reactive({ content: '', showInMenu: false, isPublished: false })
    pageStore.setContext(useContext())

    return {
      item,
      ...toRefs(itemCreate(pageStore))
    }
  },
  head () {
    return {
      title: 'Ajout d\'une page'
    }
  }
})
</script>
