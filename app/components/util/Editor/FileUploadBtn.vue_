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
        <file-manager ref="fileManager" />
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
import { defineComponent, nextTick, Ref, ref, watch } from '@nuxtjs/composition-api'
import { Editor } from '@tiptap/core'
import FileManager, { Link, Thumbnail } from '../../file-manager/FileManager.vue'

export default defineComponent({
  components: { FileManager },
  props: {
    editor: {
      type: Object as () => Editor | null,
      required: true
    }
  },
  setup (props) {
    const dialog = ref(false)
    const fileManager = ref(null) as Ref<typeof FileManager | null>

    const injectFilesAndCloseDialog = () => {
      // @ts-ignore
      fileManager.value?.thumbnails.forEach((thumbnail: Thumbnail) => {
        props.editor?.chain().focus().setImage({ src: thumbnail.src }).run()
      })
      // @ts-ignore
      fileManager.value?.links.forEach((link: Link) => {
        const node = props.editor?.schema.text(link.name, [props?.editor.schema.marks.link.create({ href: link.src })])
        // @ts-ignore
        props.editor?.view.dispatch(props.editor?.state.tr.replaceSelectionWith(node, false))
      })

      dialog.value = false
    }

    watch(dialog, () => {
      nextTick(() => {
        // @ts-ignore
        fileManager.value?.reset()
      })
    })

    return {
      dialog,
      injectFilesAndCloseDialog,
      fileManager
    }
  }
})
</script>
