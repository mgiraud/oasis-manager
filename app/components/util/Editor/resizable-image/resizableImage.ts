// 1. Import the extension
import Image from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ResizableImageNode from './ResizableImageNode.vue'

// 2. Overwrite the keyboard shortcuts
const ResizableImage = Image.extend({
  draggable: true,
  addNodeView () {
    return VueNodeViewRenderer(ResizableImageNode)
  },
  addAttributes () {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: '400px'
      }
    }
  }
})

export default ResizableImage
