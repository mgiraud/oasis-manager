<template>
  <div class="flex flex-col">
    <div :class="{'text-accent': !!errorMessage, 'text-primary': !!value && !errorMessage}" class="flex">
      {{ label }}
      <Tooltip v-if="errorMessage">{{errorMessage}}</Tooltip>
    </div>
    <div class="editor flex flex-wrap" v-if="editor">
      <editor-btn
        label="Gras"
        :btn-class="{ 'fill-stone-400': editor.isActive('bold') }"
        :click-handler="() => editor.chain().focus().toggleBold().run()"
        icon-component="ri-bold"
      />
      <editor-btn
        label="Italique"
        :btn-class="{ 'fill-stone-400': editor.isActive('italic') }"
        :click-handler="() => editor.chain().focus().toggleItalic().run()"
        icon-component="ri-italic"
      />
      <editor-btn
        label="Barrer"
        :btn-class="{ 'grey darken-3': editor.isActive('strike') }"
        :click-handler="() => editor.chain().focus().toggleStrike().run()"
        icon-component="ri-strikethrough"
      />
      <text-color-btn :editor="editor" />
      <text-background-color-btn :editor="editor" />
      <font-family-btn :editor="editor" />
      <editor-btn
        label="Supprimer le style de la sélection"
        :click-handler="() => editor.chain().focus().unsetAllMarks().run()"
        icon-component="ri-format-clear"
      />
      <editor-btn
        label="Supprimer le style du bloc"
        :click-handler="() => editor.chain().focus().clearNodes().run()"
        icon-component="ri-eraser-line"
      />
      <editor-btn
        label="Paragraphe"
        :btn-class="{ 'grey darken-3': editor.isActive('paragraph') }"
        :click-handler="() => editor.chain().focus().setParagraph().run()"
        icon-component="ri-paragraph"
      />
      <editor-btn
        label="Taille xxl"
        :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 1 }) }"
        :click-handler="() => editor.chain().focus().toggleHeading({ level: 1 }).run()"
        icon-component="ri-h-1"
      />
      <editor-btn
        label="Taille xl"
        :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 2 }) }"
        :click-handler="() => editor.chain().focus().toggleHeading({ level: 2 }).run()"
        icon-component="ri-h-2"
      />
      <editor-btn
        label="Taille l"
        :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 3 }) }"
        :click-handler="() => editor.chain().focus().toggleHeading({ level: 3 }).run()"
        icon-component="ri-h-3"
      />
      <editor-btn
        label="Taille m"
        :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 4 }) }"
        :click-handler="() => editor.chain().focus().toggleHeading({ level: 4 }).run()"
        icon-component="ri-h-4"
      />
      <editor-btn
        label="Taille s"
        :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 5 }) }"
        :click-handler="() => editor.chain().focus().toggleHeading({ level: 5 }).run()"
        icon-component="ri-h-5"
      />
      <editor-btn
        label="Taille xs"
        :btn-class="{ 'grey darken-3': editor.isActive('heading', { level: 6 }) }"
        :click-handler="() => editor.chain().focus().toggleHeading({ level: 6 }).run()"
        icon-component="ri-h-6"
      />
      <editor-btn
        label="Liste"
        :btn-class="{ 'grey darken-3': editor.isActive('bulletList') }"
        :click-handler="() => editor.chain().focus().toggleBulletList().run()"
        icon-component="ri-list-unordered"
      />
      <editor-btn
        label="Liste numérotée"
        :btn-class="{ 'grey darken-3': editor.isActive('orderedList') }"
        :click-handler="() => editor.chain().focus().toggleOrderedList().run()"
        icon-component="ri-list-ordered"
      />
      <editor-btn
        label="Bloc de code"
        :btn-class="{ 'grey darken-3': editor.isActive('codeBlock') }"
        :click-handler="() => editor.chain().focus().toggleCodeBlock().run()"
        icon-component="ri-code-line"
      />
      <editor-btn
        label="Citation"
        :btn-class="{ 'grey darken-3': editor.isActive('blockquote') }"
        :click-handler="() => editor.chain().focus().toggleCodeBlock().run()"
        icon-component="ri-double-quotes-l"
      />
      <editor-btn
        label="Séparateur horizontal"
        :click-handler="() => editor.chain().focus().setHorizontalRule().run()"
        icon-component="ri-separator"
      />
      <editor-btn
        label="Undo"
        :click-handler="() => editor.chain().focus().undo().run()"
        icon-component="ri-arrow-go-back-line"
      />
      <editor-btn
        label="Redo"
        :click-handler="() => editor.chain().focus().redo().run()"
        icon-component="ri-arrow-go-forward-line"
      />
      <editor-btn
        label="Aligner à gauche"
        :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'left' }) }"
        :click-handler="() => editor.chain().focus().setTextAlign('left').run()"
        icon-component="ri-align-left"
      />
      <editor-btn
        label="Centrer"
        :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'center' }) }"
        :click-handler="() => editor.chain().focus().setTextAlign('center').run()"
        icon-component="ri-align-center"
      />
      <editor-btn
        label="Aligner à droite"
        :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'right' }) }"
        :click-handler="() => editor.chain().focus().setTextAlign('right').run()"
        icon-component="ri-align-right"
      />
      <editor-btn
        label="Justifier"
        :btn-class="{ 'grey darken-3': editor.isActive({ textAlign: 'justify' }) }"
        :click-handler="() => editor.chain().focus().setTextAlign('justify').run()"
        icon-component="ri-align-justify"
      />
      <editor-btn
        label="Ajouter une image"
        :btn-class="null"
        :click-handler="addImage"
        icon-component="ri-image-line"
      />
      <file-upload-btn :editor="editor" />
      <editor-btn
        label="Ajouter un lien"
        :click-handler="setLink"
        :btn-class="{ 'is-active': editor.isActive('link') }"
        icon-component="ri-link"
      />
      <editor-btn
        v-if="editor.isActive('link')"
        label="Supprimer le lien"
        icon-component="ri-link-unlink"
        :click-handler="() => editor.chain().focus().unsetLink().run()"
      />
      <slot name="supplemental_btns" />
      <editor-btn
        label="Supprimer le contenu"
        icon-component="ri-delete-bin-2-line"
        :click-handler="clearContent"
      />
    </div>
    <editor-content
      class="border border-2 border-black"
      :editor="editor"
    />
  </div>
</template>

<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Starterkit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { Ref } from '@vue/reactivity'
import { useField } from 'vee-validate'
import EditorBtn from './Editor/EditorBtn.vue'
import Typography from '@tiptap/extension-typography'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import FileUploadBtn from './Editor/FileUploadBtn.vue'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import ResizableImage from './Editor/resizable-image/resizableImage'
import TextColor from '~/components/util/Editor/text-color/text-color'
import TextBackgroundColor from '~/components/util/Editor/text-background-color/text-background-color'
import TextColorBtn from './Editor/TextColorBtn.vue'
import TextBackgroundColorBtn from './Editor/TextBackgroundColorBtn.vue'
import FontFamilyBtn from './Editor/FontFamilyBtn.vue'
import Tooltip from '~/components/util/Tooltip.vue'

const editor = ref(null) as Ref<Editor | null>
const props = defineProps<{
  name: string,
  value: string,
  label: string
}>()

const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

onMounted(() => {
  editor.value = new Editor({
    content: inputValue.value,
    extensions: [
      Starterkit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      // ResizableImage.configure({ inline: true }),
      Link.configure({ openOnClick: true }),
      TextStyle,
      TextColor,
      TextBackgroundColor,
      FontFamily
    ],
    onUpdate: ({editor}) => {
      inputValue.value = editor.getHTML()
    }
  })
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})

const clearContent = (e: Event) => {
  setContent('')
}

const addImage = () => {
  const url = window.prompt('URL')

  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run()
  }
}

const setLink = () => {
  const url = window.prompt('URL')
  if (url) {
    editor.value?.chain().focus().setLink({ href: url }).run()
  }
}

const setContent = (content: string) => {
  editor.value?.commands.setContent(content, false)
}

watch(() => props.modelValue, (newValue) => {
  const isSame = editor.value?.getHTML() === newValue

  if (isSame) {
    return
  }
  setContent(newValue || '')
})

defineExpose({setContent})
</script>

<style>
.ProseMirror {
  min-height: 200px;
}
</style>
