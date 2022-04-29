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
            <v-icon>ri-paint-fill</v-icon>
          </v-btn>
        </template>
        <span>Couleur de fond</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(color, index) in colors"
        :key="index"
        :class="color.background"
        @click="chooseBackgroundColor(color)"
      >
        <v-list-item-title>{{ color.name }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="removeBackgroundColor"
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

    const chooseBackgroundColor = (backgroundColor: EditorColor) => {
      props.editor?.chain().focus().setBackgroundColor(backgroundColor.background).run()
      dialog.value = false
    }

    const removeBackgroundColor = () => {
      props.editor?.chain().focus().removeBackgroundColor().run()
      dialog.value = false
    }

    return {
      dialog,
      colors,
      chooseBackgroundColor,
      removeBackgroundColor
    }
  }
})
</script>
