<template>
  <v-container>
    <v-row v-if="error">
      <v-alert
        type="error"
      >
        {{ error }}
      </v-alert>
    </v-row>
    <v-row>
      <AdminPageForm
        v-if="item"
        ref="updateForm"
        :values="item"
        :errors="violations"
      />
    </v-row>
    <v-row>
      <v-col>
        <FormToolbar
          :handle-submit="onSendForm"
          :handle-reset="resetForm"
          :handle-delete="del"
        >
          <template #left>
            <h1 v-if="item">
              Edit {{ item['@id'] }}
            </h1>
          </template>
        </FormToolbar>
      </v-col>
    </v-row>
    <Loading :visible="deleteLoading" />
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import update from '~/mixins/update'

export default {
  mixins: [update],
  computed: {
    ...mapFields('page', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('page', ['find'])
  },
  methods: {
    ...mapActions('page', {
      createReset: 'resetCreate',
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
      update: 'update',
      updateReset: 'resetUpdate'
    })
  }
}
</script>
