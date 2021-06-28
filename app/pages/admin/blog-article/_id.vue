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
          :handle-delete="canDelete ? del : null"
          :handle-back="back"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item['url'] }}
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
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/blog-article/Form.vue'
import itemSecurity from '~/composable/itemSecurity'
import itemUpdate from '~/composable/itemUpdate'
import { blogArticleStore } from '~/store/BlogArticleStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_BLOG_ARTICLES']
  },
  setup () {
    blogArticleStore.setContext(useContext())

    return {
      ...toRefs(itemUpdate(blogArticleStore)),
      ...toRefs(itemSecurity(blogArticleStore))
    }
  }
})
</script>
