export type EditorColor = {
    name: string
    text: string
    background: string
}

export const editorColors: EditorColor[] = [
  { name: 'Titre', text: 'text-primary-dark', background: 'bg-primary-dark' },
  { name: 'Primaire', text: 'text-primary', background: 'bg-primary' },
  { name: 'Info', text: 'text-info', background: 'bg-info' },
  { name: 'Erreur', text: 'text-error', background: 'bg-error' },
  { name: 'Accent', text: 'text-accent', background: 'bg-accent' },
  { name: 'Secondaire', text: 'text-secondary', background: 'bg-secondary' },
  { name: 'Light secondaire', text: 'text-secondary-light', background: 'bg-secondary-light' },
  { name: 'Noir', text: 'text-black', background: 'bg-black' },
  { name: 'Blanc', text: 'text-white', background: 'bg-white' }
]
