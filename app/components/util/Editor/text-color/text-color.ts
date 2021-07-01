import { Command, Extension } from '@tiptap/core'

export interface TextColorOptions {
    color: string
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      'text-color': {
         setColor: (color: string) => ReturnType,
         removeColor: () => ReturnType,
      }
    }
  }

export default Extension.create<TextColorOptions>({
  name: 'text-color',
  addGlobalAttributes () {
    return [{
      types: [
        'heading',
        'paragraph',
        'textStyle'
      ],
      attributes: {
        color: {
          default: null,
          renderHTML (attributes: TextColorOptions) {
            if (!attributes.color) {
              return {}
            }
            return {
              class: `${attributes.color}--text`,
              'data-color': attributes.color
            }
          },
          parseHTML (element: HTMLElement) {
            return {
              color: element.getAttribute('data-color')
            }
          }
        }
      }
    }]
  },

  addCommands () {
    return {
      setColor: (color: string) => ({ chain }) => {
        return chain().setMark('textStyle', { color }).run()
      },
      removeColor: () => ({ chain }) => {
        return chain().setMark('textStyle', { color: null }).run()
      }
    }
  }
})
