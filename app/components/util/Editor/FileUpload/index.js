import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'FileUploadComponent',

  group: 'block',

  atom: true,

  addAttributes () {
    return {
      count: {
        default: 0
      }
    }
  },

  addCommands () {
    return {
      setUploadedFile: options => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'file-upload-component'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['file-upload-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView () {
    return VueNodeViewRenderer(Component)
  }
})
