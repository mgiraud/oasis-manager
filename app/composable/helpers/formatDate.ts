import { formatRelative, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

export const formatDate = (rawDate: string) => {
  return formatRelative(parseISO(rawDate), new Date(), { locale: fr })
}
