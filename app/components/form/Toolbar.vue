<template>
  <v-toolbar flat bottom>
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

      <v-btn v-if="handleAdd" color="primary" rounded @click="addItem">
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ConfirmDelete from '~/components/util/ConfirmDelete.vue'

@Component({
  name: 'Toolbar',
  components: {
    ConfirmDelete
  }
})
export default class Toolbar extends Vue {
  @Prop({ type: Function, default: null })
  handleBack!: any

  @Prop({ type: Function, default: null })
  handleEdit!: any

  @Prop({ type: Function, default: null })
  handleSubmit!: any

  @Prop({ type: Function, default: null })
  handleReset!: any

  @Prop({ type: Function, default: null })
  handleDelete: any

  @Prop({ type: Function, default: null })
  handleAdd!: any

  @Prop({ type: String, default: '', required: false })
  title!: any

  @Prop({ type: Boolean, default: false, required: false })
  isLoading!: any

  confirmDelete = false

  goBack () {
    if (this.handleBack) {
      this.handleBack()
    }
  }

  addItem () {
    if (this.handleAdd) {
      this.handleAdd()
    }
  }

  editItem () {
    if (this.handleEdit) {
      this.handleEdit()
    }
  }

  submitItem () {
    if (this.handleSubmit) {
      this.handleSubmit()
    }
  }

  resetItem () {
    if (this.handleReset) {
      this.handleReset()
    }
  }
}
</script>
