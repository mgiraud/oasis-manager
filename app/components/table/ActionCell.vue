<template>
  <div>
    <v-row justify="space-around">
      <v-icon v-if="handleShow" small class="mr-2" @click="handleShow">
        mdi-eye
      </v-icon>
      <v-icon v-if="handleEdit" small class="mr-2" @click="handleEdit">
        mdi-pencil
      </v-icon>
      <v-icon v-if="handleDelete" small @click="confirmDelete = true">
        mdi-delete
      </v-icon>
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
      default: () => null
    },
    handleEdit: {
      type: Function,
      required: false,
      default: () => null
    },
    handleDelete: {
      type: Function,
      required: false,
      default: () => null
    }
  },
  data: () => ({
    confirmDelete: false
  })
}
</script>
