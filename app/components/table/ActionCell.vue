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
          mdi-eye
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
          mdi-pencil
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
          mdi-delete
        </v-icon>
      </v-btn>
    </v-row>
    <UtilConfirmDelete
      v-if="handleDelete"
      :visible="confirmDelete"
      :handle-delete="handleDelete"
      @close="confirmDelete = false"
    />
  </div>
</template>

<script>
export default {
  name: 'ActionCell',
  props: {
    handleShow: {
      type: Function,
      required: false,
      default: null
    },
    handleEdit: {
      type: Function,
      required: false,
      default: null
    },
    handleDelete: {
      type: Function,
      required: false,
      default: null
    }
  },
  data: () => ({
    confirmDelete: false
  })
}
</script>
