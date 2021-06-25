<template>
  <div>
    <v-row justify="center">
      <v-btn
        v-if="handleShow"
        elevation="0"
        tile
        color="info"
        @click="handleShow"
      >
        <v-icon>
          ri-eye-line
        </v-icon>
      </v-btn>
      <v-btn
        v-if="handleEdit"
        elevation="0"
        tile
        color="primary"
        @click="handleEdit"
      >
        <v-icon>
          ri-edit-line
        </v-icon>
      </v-btn>
      <v-btn
        v-if="handleDelete"
        elevation="0"
        tile
        color="accent"
        @click="confirmDelete = true"
      >
        <v-icon>
          ri-delete-bin-line
        </v-icon>
      </v-btn>
    </v-row>
    <ConfirmDelete
      v-if="handleDelete"
      :visible="confirmDelete"
      :handle-delete="handleDelete"
      @close="confirmDelete = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import ConfirmDelete from '../util/ConfirmDelete.vue'

export default defineComponent({
  components: {
    ConfirmDelete
  },
  props: {
    handleShow: {
      type: Function,
      default: null
    },
    handleEdit: {
      type: Function,
      default: null
    },
    handleDelete: {
      type: Function,
      default: null
    }
  },
  setup() {
    const confirmDelete = ref(false)

    return {
      confirmDelete
    }
  }
})
</script>
