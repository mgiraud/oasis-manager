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
            <v-icon>ri-font-size</v-icon>
          </v-btn>
        </template>
        <span>Police de caractère</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(font, index) in fonts"
        :key="index"
        @click="selectFontFamily(font)"
      >
        <v-list-item-title :style="'font-family: ' + font">
          {{ font }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="removeFontFamily"
      >
        <v-list-item-title>Par défaut</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Editor } from '@tiptap/core'

const fonts = [
  'Permanent Marker',
  'Amatic SC',
  'Caveat',
  'Helvetica'
]

export default defineComponent({
  props: {
    editor: {
      type: Object as () => Editor | null,
      required: true
    }
  },
  setup (props) {
    const dialog = ref(false)

    const selectFontFamily = (font: string) => {
      props.editor?.chain().focus().setFontFamily(font).run()
      dialog.value = false
    }

    const removeFontFamily = () => {
      props.editor?.chain().focus().unsetFontFamily().run()
      dialog.value = false
    }

    return {
      dialog,
      fonts,
      selectFontFamily,
      removeFontFamily
    }
  }
})
</script>
