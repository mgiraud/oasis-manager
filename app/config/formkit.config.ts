import { fr } from '@formkit/i18n'
import { generateClasses } from '@formkit/tailwindcss'
import { DefaultConfigOptions } from '@formkit/vue'
import theme from './theme'

const config: DefaultConfigOptions = {
  config: {
    locales: { fr },
    locale: 'fr',
    classes: generateClasses(theme)
  }
}

export default config
