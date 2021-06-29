<template>
  <v-toolbar
    flat
    bottom
  >
    <slot name="left" />
    <v-spacer />
    <div>
      <v-btn
        v-if="handleBack"
        :loading="isLoading"
        color="primary"
        @click="goBack"
      >
        Retour
      </v-btn>
      <v-btn
        v-if="handleEdit"
        :loading="isLoading"
        color="primary"
        @click="editItem"
      >
        Editer
      </v-btn>
      <v-btn
        v-if="handleSubmit"
        :loading="isLoading"
        color="primary"
        @click="submitItem"
      >
        Envoyer
      </v-btn>
      <v-btn
        v-if="handleReset"
        class="ml-sm-2"
        @click="resetItem"
      >
        Reinitialiser
      </v-btn>
      <v-btn
        v-if="handleDelete"
        color="error"
        class="ml-sm-2"
        @click="confirmDelete = true"
      >
        Supprimer
      </v-btn>

      <v-btn
        v-if="handleAdd"
        color="primary"
        rounded
        @click="addItem"
      >
        <v-icon>ri-add-line</v-icon>
      </v-btn>
    </div>
    <ConfirmDelete
      v-if="handleDelete"
      :visible="confirmDelete"
      :handle-delete="handleDelete"
      @close="confirmDelete = false"
    />
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import ConfirmDelete from '~/components/util/ConfirmDelete.vue'

export default defineComponent({
  components: {
    ConfirmDelete
  },
  props: {
    handleBack: {
      type: Function,
      default: null
    },
    handleEdit: {
      type: Function,
      default: null
    },
    handleSubmit: {
      type: Function,
      default: null
    },
    handleReset: {
      type: Function,
      default: null
    },
    handleDelete: {
      type: Function,
      default: null
    },
    handleAdd: {
      type: Function,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const confirmDelete = ref(false)

    const goBack = () => {
      if (props.handleBack) {
        // @ts-ignore
        props.handleBack()
      }
    }

    const addItem = () => {
      if (props.handleAdd) {
        // @ts-ignore
        props.handleAdd()
      }
    }

    const editItem = () => {
      if (props.handleEdit) {
        // @ts-ignore
        props.handleEdit()
      }
    }

    const submitItem = () => {
      if (props.handleSubmit) {
        // @ts-ignore
        props.handleSubmit()
      }
    }

    const resetItem = () => {
      if (props.handleReset) {
        // @ts-ignore
        props.handleReset()
      }
    }

    return {
      confirmDelete,
      goBack,
      addItem,
      editItem,
      submitItem,
      resetItem
    }
  }
})
</script>
