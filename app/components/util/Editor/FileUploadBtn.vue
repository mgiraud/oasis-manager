<template>
  <v-dialog
    v-model="dialog"
    width="90%"
  >
    <template #activator="{ on: onDropdown, attrs: attrsDropdown }">
      <v-tooltip top>
        <template #activator="{ on: onTooltip, attrs: attrsTooltip }">
          <v-btn
            small
            v-bind="{...attrsDropdown, ...attrsTooltip}"
            v-on="{...onDropdown, ...onTooltip}"
          >
            <v-icon>ri-file-transfer-line</v-icon>
          </v-btn>
        </template>
        <span>Téléverser un fichier</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        Téléverser un fichier
      </v-card-title>

      <v-card-text>
        <file-manager ref="file-manager" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click.prevent="injectFilesAndCloseDialog"
        >
          Insérer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Editor } from '@tiptap/core'
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import FileManager, { Link, Thumbnail } from '~/components/file-manager/FileManager.vue'

@Component({
  components: { FileManager }
})
export default class FileUploadBtn extends Vue {
  @Prop({ type: Object, required: true }) readonly editor!: Editor
  dialog = false

  injectFilesAndCloseDialog () {
    const fileManager = this.$refs['file-manager'] as FileManager
    fileManager.thumbnails.forEach((thumbnail: Thumbnail) => {
      this.editor.chain().focus().setImage({ src: thumbnail.src }).run()
    })
    fileManager.links.forEach((link: Link) => {
      const node = this.editor.schema.text(link.name, [this.editor.schema.marks.link.create({ href: link.src })])
      this.editor.view.dispatch(this.editor.state.tr.replaceSelectionWith(node, false))
    })

    this.dialog = false
  }

  @Watch('dialog')
  onDialogToggle () {
    this.$nextTick(() => {
      (this.$refs['file-manager'] as FileManager).reset()
    })
  }
}
</script>
