<template>
  <div>
    <div class="editor">
      <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
        <v-toolbar flat dark short>
          <v-btn
            v-for="button in buttons"
            :key="button.icon + button.context"
            icon
            fab
            :color="isActive[button.context] && isActive[button.context](button.options) ? 'grey' : undefined"
            @click="commands[button.context] && commands[button.context](button.options)"
          >
            <component
              :is="button.isIcon ? 'v-icon' : 'b'"
              :class="{ 'is-active': isActive[button.context] && isActive[button.context](button.options) }"
            >
              {{ button.icon }}
            </component>
          </v-btn>
        </v-toolbar>
      </editor-menu-bar>

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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    value: {
      type: [String, null],
      required: false,
      default: null
    }
  },
  data: () => ({
    editor: null,
    buttons: [
      { context: 'bold', icon: 'mdi-format-bold', isIcon: true, options: {} },
      { context: 'italic', icon: 'mdi-format-italic', isIcon: true, options: {} },
      { context: 'strike', icon: 'mdi-format-strikethrough', isIcon: true, options: {} },
      { context: 'underline', icon: 'mdi-format-underline', isIcon: true, options: {} },
      { context: 'code', icon: 'mdi-code-tags', isIcon: true, options: {} },
      { context: 'paragraph', icon: 'mdi-format-paragraph', isIcon: true, options: {} },
      { context: 'heading', icon: 'H1', isIcon: false, options: { level: 1 } },
      { context: 'heading', icon: 'H2', isIcon: false, options: { level: 2 } },
      { context: 'heading', icon: 'H3', isIcon: false, options: { level: 3 } },
      { context: 'bullet_list', icon: 'mdi-format-list-bulleted', isIcon: true, options: {} },
      { context: 'ordered_list', icon: 'mdi-format-list-numbered', isIcon: true, options: {} },
      { context: 'blockquote', icon: 'mdi-format-quote-close', isIcon: true, options: {} },
      { context: 'code_block', icon: 'mdi-code-tags', isIcon: true, options: {} },
      { context: 'horizontal_rule', icon: 'mdi-minus', isIcon: true, options: {} },
      { context: 'undo', icon: 'mdi-undo', isIcon: true, options: {} },
      { context: 'redo', icon: 'mdi-redo', isIcon: true, options: {} }
    ]
  }),
  watch: {
    value (val) {
      // so cursor doesn't jump to start on typing
      if (this.editor && val !== this.value) {
        this.editor.setContent(this.value, true)
      }
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      // content: this.value,
      onUpdate: ({ getHTML }) => {
        this.$emit('input', getHTML())
      }
    })
    this.editor.setContent(this.value)
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    clearContent () {
      this.editor.clearContent(true)
      this.editor.focus()
    }
  }

}
</script>
