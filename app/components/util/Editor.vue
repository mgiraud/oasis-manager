<template>
  <div>
    <div class="editor">
      <v-toolbar v-if="editor" flat dark>
        <editor-btn
          label="Gras"
          :btn-class="{ 'grey darken-3': editor.isActive('bold') }"
          :click-handler="() => editor.chain().focus().toggleBold().run()"
          icon="mdi-format-bold"
        />
        <editor-btn
          label="Italique"
          :btn-class="{ 'grey darken-3': editor.isActive('italic') }"
          :click-handler="() => editor.chain().focus().toggleItalic().run()"
          icon="mdi-format-italic"
        />
        <editor-btn
          label="Barrer"
          :btn-class="{ 'grey darken-3': editor.isActive('strike') }"
          :click-handler="() => editor.chain().focus().toggleStrike().run()"
          icon="mdi-format-strikethrough"
        />
        <editor-btn
          label="Supprimer le style de la sélection"
          :click-handler="() => editor.chain().focus().unsetAllMarks().run()"
          icon="mdi-format-clear"
        />
        <editor-btn
          label="Supprimer le style du bloc"
          :click-handler="() => editor.chain().focus().clearNodes().run()"
          icon="mdi-layers-off"
        />
        <editor-btn
          label="Barrer"
          :btn-class="{ 'grey darken-3': editor.isActive('paragraph') }"
          :click-handler="() => editor.chain().focus().setParagraph().run()"
          icon="mdi-format-pilcrow"
        />
        <editor-btn
          label="Taille xxl"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 1 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 1 }).run()"
          icon="mdi-format-header-1"
        />
        <editor-btn
          label="Taille xl"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 2 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 2 }).run()"
          icon="mdi-format-header-2"
        />
        <editor-btn
          label="Taille l"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 3 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 3 }).run()"
          icon="mdi-format-header-3"
        />
        <editor-btn
          label="Taille m"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 4 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 4 }).run()"
          icon="mdi-format-header-4"
        />
        <editor-btn
          label="Taille s"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 5 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 5 }).run()"
          icon="mdi-format-header-5"
        />
        <editor-btn
          label="Taille xs"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 6 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 6 }).run()"
          icon="mdi-format-header-6"
        />
        <editor-btn
          label="Liste"
          :btn-class="{ 'grey darken-3': editor.isActive('bulletList') }"
          :click-handler="() => editor.chain().focus().toggleBulletList().run()"
          icon="mdi-format-list-bulleted"
        />
        <editor-btn
          label="Liste numérotée"
          :btn-class="{ 'grey darken-3': editor.isActive('orderedList') }"
          :click-handler="() => editor.chain().focus().toggleOrderedList().run()"
          icon="mdi-format-list-numbered"
        />
        <editor-btn
          label="Bloc de code"
          :btn-class="{ 'grey darken-3': editor.isActive('codeBlock') }"
          :click-handler="() => editor.chain().focus().toggleCodeBlock().run()"
          icon="mdi-code-tags"
        />
        <editor-btn
          label="Citation"
          :btn-class="{ 'grey darken-3': editor.isActive('blockquote') }"
          :click-handler="() => editor.chain().focus().toggleCodeBlock().run()"
          icon="mdi-format-quote-close"
        />
        <editor-btn
          label="Séparateur horizontal"
          :click-handler="() => editor.chain().focus().setHorizontalRule().run()"
          icon="mdi-minus"
        />
        <editor-btn
          label="Retour à la ligne"
          :click-handler="() => editor.chain().focus().setHardBreak().run()"
          icon="mdi-keyboard-return"
        />
        <editor-btn
          label="Undo"
          :click-handler="() => editor.chain().focus().undo().run()"
          icon="mdi-undo"
        />
        <editor-btn
          label="Redo"
          :click-handler="() => editor.chain().focus().redo().run()"
          icon="mdi-redo"
        />
        <editor-btn
          label="Aligner à gauche"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'left' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('left').run()"
          icon="mdi-format-align-left"
        />
        <editor-btn
          label="Centrer"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'center' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('center').run()"
          icon="mdi-format-align-center"
        />
        <editor-btn
          label="Aligner à droite"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'right' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('right').run()"
          icon="mdi-format-align-right"
        />
        <editor-btn
          label="Justifier"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'justify' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('justify').run()"
          icon="mdi-format-align-justify"
        />
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

.v-toolbar {
  ::v-deep {
    .v-toolbar__content {
      flex-wrap: wrap;
    }
  }
}
</style>

<script>
// import the component and the necessary extensions
import { Editor, EditorContent } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import EditorBtn from '@/components/util/Editor/EditorBtn'
import Gapcursor from '@tiptap/extension-gapcursor'
import Typography from '@tiptap/extension-typography'

export default {
  components: {
    EditorContent,
    EditorBtn
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
      extensions: [...defaultExtensions(), TextAlign, Gapcursor, Typography]
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
