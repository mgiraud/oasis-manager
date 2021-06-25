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
          :page-logs="pageLogs"
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
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, toRefs, useContext, watch } from '@nuxtjs/composition-api'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Form from '~/components/admin/page/Form.vue'
import itemSecurity from '~/composable/itemSecurity'
import itemUpdate from '~/composable/itemUpdate'
import { notificationStore } from '~/store/NotificationStore'
import { pageStore } from '~/store/PageStore'
import { pageLogStore } from '~/store/PageLogStore'
import { securityStore } from '~/store/SecurityStore'

export default defineComponent({
  components: {
    Loading, Toolbar, Form
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGES']
  },
  setup () {
    const context = useContext()
    pageStore.setContext(context)
    pageLogStore.setContext(context)

    const itemUpdateHelper = itemUpdate(pageStore)

    const canDelete = computed(() => {
      return securityStore.hasPermission('USER_CAN_DELETE_PAGES')
    })

    let autoSaveInterval: number | null = null

    watch(() => pageStore.getState().updated, (val: U | null) => {
      if (val) {
        notificationStore.showMessage(pageStore.getUpdateMessage(val))
      }
    })

    watch(() => itemUpdateHelper.retrieved, (val) => {
      if (val) {
        loadLogs()
      }
    })

    onMounted(() => {
      if (process.client) {
        autoSaveInterval = window.setInterval(autoSave, 120000)
      }
    })

    onBeforeUnmount(() => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval)
      }
      autoSaveInterval = null
    })

    const loadLogs = () => {
      if (itemUpdateHelper.item) {
        pageLogStore.resetList()
        pageLogStore.fetchAll({
          'page.url': itemUpdateHelper.item.url,
          'order[updatedAt]': 'desc'
        })
      }
    }

    const autoSave = () => {
      pageLogStore.create({
        originalContent: itemUpdateHelper.item.content,
        draft: true,
        page: itemUpdateHelper.item['@id']
      }).then(() => {
        loadLogs()
      })
    }

    return {
      ...toRefs(itemUpdateHelper),
      ...toRefs(itemSecurity(pageStore)),
      pageLogs: pageLogStore.list,
    }
  },
  head () {
    return {
      title: 'Edition d\'une page'
    }
  }
})
</script>
