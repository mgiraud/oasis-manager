<template>
  <v-toolbar flat bottom>
    <slot name="left" />
    <v-spacer />
    <div>
      <v-btn
        v-if="handleEdit"
        :loading="isLoading"
        color="primary"
        @click="editItem"
      >
        Edit
      </v-btn>
      <v-btn
        v-if="handleSubmit"
        :loading="isLoading"
        color="primary"
        @click="submitItem"
      >
        Submit
      </v-btn>
      <v-btn
        v-if="handleReset"
        class="ml-sm-2"
        @click="resetItem"
      >
        Reset
      </v-btn>
      <v-btn
        v-if="handleDelete"
        color="error"
        class="ml-sm-2"
        @click="confirmDelete = true"
      >
        Delete
      </v-btn>

      <v-btn v-if="handleAdd" color="primary" rounded @click="addItem">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </div>
    <FormConfirmDelete
      v-if="handleDelete"
      :visible="confirmDelete"
      :handle-delete="handleDelete"
      @close="confirmDelete = false"
    />
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    handleEdit: {
      type: Function,
      required: false,
      default: null
    },
    handleSubmit: {
      type: Function,
      required: false,
      default: null
    },
    handleReset: {
      type: Function,
      required: false,
      default: null
    },
    handleDelete: {
      type: Function,
      required: false,
      default: null
    },
    handleAdd: {
      type: Function,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data: () => ({
    confirmDelete: false
  }),
  methods: {
    addItem () {
      if (this.handleAdd) {
        this.handleAdd()
      }
    },
    editItem () {
      if (this.handleEdit) {
        this.handleEdit()
      }
    },
    submitItem () {
      if (this.handleSubmit) {
        this.handleSubmit()
      }
    },
    resetItem () {
      if (this.handleReset) {
        this.handleReset()
      }
    }
  }
}
</script>
