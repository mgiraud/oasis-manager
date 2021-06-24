<template>
  <div>
    <Form ref="createForm" :values="item" :errors="pageState.violations" :page-logs="[]" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="pageState.isLoading" />
  </div>
</template>

<script lang="ts">
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/page/Form.vue'
import itemCreate from '~/composable/ItemCreate'
import { defineComponent, ref, useContext, toRefs, reactive } from '@nuxtjs/composition-api'
import { pageStore } from '~/store/PageStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  setup() {
    const item = reactive({ content: '', showInMenu: false, isPublished: false })
    const createForm = ref(null)
    const itemCreateHelper = itemCreate(pageStore, createForm)
    pageStore.setContext(useContext())

    return {
      item,
      pageState: pageStore.getState(),
      ...toRefs(itemCreateHelper),
      createForm
    }
  },
  head() {
    return {
      title: 'Ajout d\'une page'
    }
  },
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  }
})
</script>
