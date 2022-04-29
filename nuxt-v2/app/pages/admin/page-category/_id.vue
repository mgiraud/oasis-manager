<template>
  <v-container>
    <v-row v-if="state.error">
      <v-col cols="12">
        <v-alert
          type="error"
        >
          {{ state.error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Form
          v-if="item"
          ref="updateForm"
          :values="item"
          :errors="state.violations"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Toolbar
          :handle-submit="onSendForm"
          :handle-reset="resetForm"
          :handle-delete="del"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item.name }}
            </h1>
          </template>
        </Toolbar>
      </v-col>
    </v-row>
    <Loading :visible="state.isLoading" />
  </v-container>
</template>
<script lang="ts">
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import Form from '../../../components/admin/page-category/Form.vue'
import Toolbar from '../../../components/form/Toolbar.vue'
import Loading from '../../../components/util/Loading.vue'
import itemUpdate from '../../../composable/itemUpdate'
import { pageLogStore } from '../../../custom-store/PageLogStore'
import { pageCategoryStore } from '../../../custom-store/PageCategoryStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },
  setup () {
    pageCategoryStore.setContext(useContext())

    return {
      ...toRefs(itemUpdate(pageCategoryStore)),
      pageLogs: pageLogStore.list
    }
  }
})
</script>
