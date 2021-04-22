export type EditorColor = {
    name: string
    text: string
    background: string
}

export const editorColors: EditorColor[] = [
  { name: 'Titre', text: 'text--darken-4 primary', background: 'darken-4 primary' },
  { name: 'Primaire', text: 'primary', background: 'primary' },
  { name: 'Info', text: 'info', background: 'info' },
  { name: 'Erreur', text: 'error', background: 'error' },
  { name: 'Accent', text: 'accent', background: 'accent' },
  { name: 'Secondaire', text: 'text--darken-1 secondary', background: 'darken-1 secondary' },
  { name: 'Light secondaire', text: 'text--lighten-3 secondary', background: 'lighten-3 secondary' },
  { name: 'Noir', text: 'black', background: 'black' },
  { name: 'Blanc', text: 'white', background: 'white' }
]
