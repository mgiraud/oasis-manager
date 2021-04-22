<template>
  <v-dialog v-model="dialog" width="300">
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Editor } from '@tiptap/core'
import { EditorColor, editorColors } from './colors'

@Component
export default class TextColorBtn extends Vue {
  @Prop({ type: Object, required: true }) readonly editor!: Editor
  dialog = false
  colors = editorColors

  chooseColor (color: EditorColor) {
    this.editor.chain().focus().setColor(color.text).run()
    this.dialog = false
  }

  removeColor () {
    this.editor.chain().focus().removeColor().run()
    this.dialog = false
  }
}
</script>
