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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Editor } from '@tiptap/core'

type EditorColor = {
    name: string
    value: string
}

@Component
export default class TextBackgroundColorBtn extends Vue {
    @Prop({ type: Object, required: true }) readonly editor!: Editor
    dialog = false
    colors = [
      { name: 'Primaire', value: 'primary' }
    ]

    chooseBackgroundColor (backgroundColor: EditorColor) {
      this.editor.chain().focus().setBackgroundColor(backgroundColor.value).run()
      this.dialog = false
    }

    removeBackgroundColor () {
      this.editor.chain().focus().removeBackgroundColor().run()
      this.dialog = false
    }
}
</script>
