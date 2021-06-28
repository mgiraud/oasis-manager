<template>
  <v-dialog v-model="visible" persistent width="300">
    <v-card>
      <v-card-text>Are you sure you want to delete this item?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error darken-1" @click="handleDelete">
          Delete
        </v-btn>
        <v-btn color="secondary darken-1" text @click.stop="setVisible(false)">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    handleDelete: {
      type: Function,
      default: () => {}
    },
    visible: {
      type:Boolean,
      default: true
    }
  },
  setup(props, {emit}) {
    const setVisible = (show: boolean) => {
      emit('close')
    }

    return {
      setVisible
    }
  }
})
</script>
