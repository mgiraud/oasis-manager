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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Editor } from '@tiptap/core'

@Component
export default class TextColorBtn extends Vue {
  @Prop({ type: Object, required: true }) readonly editor!: Editor
  dialog = false
  fonts = [
    'Permanent Marker',
    'Amatic SC',
    'Caveat',
    'Helvetica'
  ]

  selectFontFamily (font: string) {
    this.editor.chain().focus().setFontFamily(font).run()
    this.dialog = false
  }

  removeFontFamily () {
    this.editor.chain().focus().unsetFontFamily().run()
    this.dialog = false
  }
}
</script>
