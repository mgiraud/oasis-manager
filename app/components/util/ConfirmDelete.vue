<template>
  <v-dialog v-model="show" persistent width="300">
    <v-card>
      <v-card-text>Are you sure you want to delete this item?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error darken-1" @click="handleDelete">
          Delete
        </v-btn>
        <v-btn color="secondary darken-1" text @click.stop="show = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'ConfirmDelete'
})
export default class ConfirmDelete extends Vue {
   @Prop({ type: Function, default: () => {} })
  handleDelete: any

  @Prop({ type: Boolean, default: true, required: false })
  visible!: any

  get show () {
    return this.visible
  }

  set show (value) {
    if (!value) {
      this.$emit('close')
    }
  }
}
</script>
