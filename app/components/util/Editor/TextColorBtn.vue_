<template>
  <v-dialog
    v-model="dialog"
    width="300"
  >
    <template #activator="{ on: onDropdown, attrs: attrsDropdown }">
      <v-tooltip top>
        <template #activator="{ on: onTooltip, attrs: attrsTooltip }">
          <v-btn
            small
            v-bind="{...attrsDropdown, ...attrsTooltip}"
            v-on="{...onDropdown, ...onTooltip}"
          >
            <v-icon>ri-font-color</v-icon>
          </v-btn>
        </template>
        <span>Couleur du texte</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(color, index) in colors"
        :key="index"
        @click="chooseColor(color)"
      >
        <v-list-item-title :class="color.text + '--text'">
          {{ color.name }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="removeColor"
      >
        <v-list-item-title>Aucune couleur</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Editor } from '@tiptap/core'
import { EditorColor, editorColors } from './colors'

export default defineComponent({
  props: {
    editor: {
      type: Object as () => Editor | null,
      required: true
    }
  },
  setup (props) {
    const dialog = ref(false)
    const colors = editorColors

    const chooseColor = (color: EditorColor) => {
      props.editor?.chain().focus().setColor(color.text).run()
      dialog.value = false
    }

    const removeColor = () => {
      props.editor?.chain().focus().removeColor().run()
      dialog.value = false
    }

    return {
      dialog,
      colors,
      chooseColor,
      removeColor
    }
  }
})
</script>
