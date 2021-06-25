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
import { defineComponent, ref, useContext, toRefs, reactive, useMeta } from '@nuxtjs/composition-api'
import { pageStore } from '~/store/PageStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  setup() {
    const item = reactive({ content: '', showInMenu: false, isPublished: false })
    pageStore.setContext(useContext())

    useMeta({
      permissions: [pageStore.editRole]
    })

    return {
      item,
      ...toRefs(itemCreate(pageStore)),
    }
  },
  head() {
    return {
      title: 'Ajout d\'une page'
    }
  },
})
</script>
