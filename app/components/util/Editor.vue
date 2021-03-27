<template>
  <div>
    <div class="editor">
      <v-toolbar v-if="editor" flat dark>
        <editor-btn
          label="Gras"
          :btn-class="{ 'grey darken-3': editor.isActive('bold') }"
          :click-handler="() => editor.chain().focus().toggleBold().run()"
          icon="ri-bold"
        />
        <editor-btn
          label="Italique"
          :btn-class="{ 'grey darken-3': editor.isActive('italic') }"
          :click-handler="() => editor.chain().focus().toggleItalic().run()"
          icon="ri-italic"
        />
        <editor-btn
          label="Barrer"
          :btn-class="{ 'grey darken-3': editor.isActive('strike') }"
          :click-handler="() => editor.chain().focus().toggleStrike().run()"
          icon="ri-strikethrough"
        />
        <editor-btn
          label="Supprimer le style de la sélection"
          :click-handler="() => editor.chain().focus().unsetAllMarks().run()"
          icon="ri-format-clear"
        />
        <editor-btn
          label="Supprimer le style du bloc"
          :click-handler="() => editor.chain().focus().clearNodes().run()"
          icon="ri-eraser-line"
        />
        <editor-btn
          label="Paragraphe"
          :btn-class="{ 'grey darken-3': editor.isActive('paragraph') }"
          :click-handler="() => editor.chain().focus().setParagraph().run()"
          icon="ri-paragraph"
        />
        <editor-btn
          label="Taille xxl"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 1 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 1 }).run()"
          icon="ri-h-1"
        />
        <editor-btn
          label="Taille xl"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 2 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 2 }).run()"
          icon="ri-h-2"
        />
        <editor-btn
          label="Taille l"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 3 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 3 }).run()"
          icon="ri-h-3"
        />
        <editor-btn
          label="Taille m"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 4 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 4 }).run()"
          icon="ri-h-4"
        />
        <editor-btn
          label="Taille s"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 5 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 5 }).run()"
          icon="ri-h-5"
        />
        <editor-btn
          label="Taille xs"
          :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 6 }) }"
          :click-handler="() => editor.chain().focus().toggleHeading({ level: 6 }).run()"
          icon="ri-h-6"
        />
        <editor-btn
          label="Liste"
          :btn-class="{ 'grey darken-3': editor.isActive('bulletList') }"
          :click-handler="() => editor.chain().focus().toggleBulletList().run()"
          icon="ri-list-unordered"
        />
        <editor-btn
          label="Liste numérotée"
          :btn-class="{ 'grey darken-3': editor.isActive('orderedList') }"
          :click-handler="() => editor.chain().focus().toggleOrderedList().run()"
          icon="ri-list-ordered"
        />
        <editor-btn
          label="Bloc de code"
          :btn-class="{ 'grey darken-3': editor.isActive('codeBlock') }"
          :click-handler="() => editor.chain().focus().toggleCodeBlock().run()"
          icon="ri-code-line"
        />
        <editor-btn
          label="Citation"
          :btn-class="{ 'grey darken-3': editor.isActive('blockquote') }"
          :click-handler="() => editor.chain().focus().toggleCodeBlock().run()"
          icon="ri-double-quotes-l"
        />
        <editor-btn
          label="Séparateur horizontal"
          :click-handler="() => editor.chain().focus().setHorizontalRule().run()"
          icon="ri-separator"
        />
        <editor-btn
          label="Undo"
          :click-handler="() => editor.chain().focus().undo().run()"
          icon="ri-arrow-go-back-line"
        />
        <editor-btn
          label="Redo"
          :click-handler="() => editor.chain().focus().redo().run()"
          icon="ri-arrow-go-forward-line"
        />
        <editor-btn
          label="Aligner à gauche"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'left' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('left').run()"
          icon="ri-align-left"
        />
        <editor-btn
          label="Centrer"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'center' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('center').run()"
          icon="ri-align-center"
        />
        <editor-btn
          label="Aligner à droite"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'right' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('right').run()"
          icon="ri-align-right"
        />
        <editor-btn
          label="Justifier"
          :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'justify' }) }"
          :click-handler="() => editor.chain().focus().setTextAlign('justify').run()"
          icon="ri-align-justify"
        />
        <editor-btn
          label="Ajouter une image"
          :btn-class="null"
          :click-handler="addImage"
          icon="ri-image-line"
        />
        <file-upload-btn :editor="editor" />
        <editor-btn
          label="Ajouter un lien"
          :click-handler="setLink"
          :btn-class="{ 'is-active': editor.isActive('link') }"
          icon="ri-link"
        />
        <editor-btn
          v-if="editor.isActive('link')"
          label="Supprimer le lien"
          icon="ri-link-unlink"
          :click-handler="() => editor.chain().focus().unsetLink().run()"
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

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
// import the component and the necessary extensions
import { Editor, EditorContent } from '@tiptap/vue-2'
import { defaultExtensions } from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import EditorBtn from '@/components/util/Editor/EditorBtn.vue'
import Gapcursor from '@tiptap/extension-gapcursor'
import Typography from '@tiptap/extension-typography'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import FileUploadBtn from '@/components/util/Editor/FileUpload/FileUploadBtn.vue'
import Link from '@tiptap/extension-link'
import FileUploadComponent from './Editor/FileUpload'

@Component({
  components: {
    FileUploadBtn,
    EditorContent,
    EditorBtn
  }
})
export default class AdminPageForm extends Vue {
  @Prop({ type: String, required: false, default: null })
  value!: string | null

  editor: Editor | null = null

  @Watch('value')
  onValueChange (value: string) {
    const isSame = this.editor?.getHTML() === value

    if (isSame) {
      return
    }

    this.editor?.commands.setContent(this.value || '', false)
  }

  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        ...defaultExtensions(),
        TextAlign,
        Gapcursor,
        Typography,
        Table.configure({
          resizable: true
        }),
        TableRow,
        TableHeader,
        TableCell,
        Image.configure({ inline: true }),
        FileUploadComponent,
        Link.configure({ openOnClick: true })
      ]
    })

    this.editor.on('update', () => {
      this.$emit('input', this.editor?.getHTML())
    })
  }

  beforeDestroy () {
    this.editor?.destroy()
  }

  clearContent () {
    this.editor?.commands.setContent('', false)
  }

  addImage () {
    const url = window.prompt('URL')

    if (url) {
      this.editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  setLink () {
    const url = window.prompt('URL')
    if (url) {
      this.editor?.chain().focus().setLink({ href: url }).run()
    }
  }
}
</script>

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

      a {
        color: #68CEF8;
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
