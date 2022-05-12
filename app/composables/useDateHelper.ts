import { formatRelative, parseISO, format } from 'date-fns'
import fr from 'date-fns/locale/fr/index.js'

export function useDateHelper() {
  const formatRDate = (rawDate: string) => {
    return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
  }

  const formatDate = (rawDate: string) => {
    return format(parseISO(rawDate), 'ii LLLL yy', { locale: fr })
  }

  return {
    formatDate,
    formatRDate
  }
}
