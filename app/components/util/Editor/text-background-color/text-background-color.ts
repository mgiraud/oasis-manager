import { Command, Extension } from '@tiptap/core'

export interface TextBackgroundColorOptions {
  backGroundColor: string
}

declare module '@tiptap/core' {
    interface Commands {
      'text-background-color': {
        setBackgroundColor: (backGroundColor: string) => Command,
        removeBackgroundColor: () => Command,
      }
    }
  }

export default Extension.create<TextBackgroundColorOptions>({
  name: 'text-background-color',
  addGlobalAttributes () {
    return [{
      types: [
        'heading',
        'paragraph',
        'textStyle'
      ],
      attributes: {
        backGroundColor: {
          default: null,
          renderHTML (attributes: TextBackgroundColorOptions) {
            if (!attributes.backGroundColor) {
              return {}
            }
            return {
              class: `${attributes.backGroundColor}`,
              'data-background-color': attributes.backGroundColor
            }
          },
          parseHTML (element: HTMLElement) {
            return {
              backGroundColor: element.getAttribute('data-background-color')
            }
          }
        }
      }
    }]
  },

  addCommands () {
    return {
      setBackgroundColor: (backGroundColor: string) => ({ chain }) => {
        return chain().setMark('textStyle', { backGroundColor }).run()
      },
      removeBackgroundColor: () => ({ chain }) => {
        return chain().setMark('textStyle', { backGroundColor: null }).run()
      }
    }
  }
})
