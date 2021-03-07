<template>
  <div>
    <div class="editor">
      <v-toolbar v-if="editor" flat dark short>
        <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
          bold
        </button>
        <button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleBold().run()">
          italic
        </button>
        <button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleBold().run()">
          italic
        </button>
        <v-btn
          small
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click="editor.chain().focus().setTextAlign('left').run()"
        >
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>
        <v-btn
          small
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click="editor.chain().focus().setTextAlign('center').run()"
        >
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>
        <v-btn
          small
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click="editor.chain().focus().setTextAlign('right').run()"
        >
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>
        <v-btn
          small
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        >
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
        <v-btn
          small
          @click="editor.chain().focus().unsetTextAlign().run()"
        >
          Default
        </v-btn>
      </v-toolbar>
      <editor-content class="editor__content" :editor="editor" />
    </div>

    <div class="actions">
      <v-btn class="v-icon" @click="clearContent">
        Clear Content
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor__content {
  ::v-deep {
    .ProseMirror {
      min-height: 100px;
      border: 1px solid #212121;
      padding: 10px;

      p {
        margin-bottom: 0;
      }
    }
  }
}
</style>

<script>
// import the component and the necessary extensions
import { Editor, EditorContent } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

export default {
  components: {
    EditorContent
  },
  props: {
    value: {
      type: [String, null],
      required: false,
      default: null
    }
  },
  data: () => ({
    editor: null
  }),
  watch: {
    value (value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.value, false)
    }
  },
  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: [...defaultExtensions(), TextAlign]
    })

    this.editor.on('update', () => {
      this.$emit('input', this.editor.getHTML())
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    clearContent () {
      this.editor.commands.setContent(null, false)
    }
  }

}
</script>
