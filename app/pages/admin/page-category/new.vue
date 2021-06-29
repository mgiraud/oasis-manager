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
import Form from '~/components/admin/page-category/Form.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Loading from '~/components/util/Loading.vue'
import itemCreate from '~/composable/ItemCreate'
import { pageCategoryStore } from '~/custom-store/PageCategoryStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGE_CATEGORIES']
  },
  setup () {
    const item = reactive({ content: null })
    pageCategoryStore.setContext(useContext())

    return {
      item,
      ...toRefs(itemCreate(pageCategoryStore))
    }
  }
})
</script>
