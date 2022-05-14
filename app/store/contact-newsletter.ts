import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { HydraMemberObject } from '~/types/hydra'

export interface ContactNewsletter extends HydraMemberObject {
  email: string,
  createdAt: string
}

interface ContactNewsletterState extends CrudState<ContactNewsletter> {
  resource: string
}

export const useContactNewsletterStore = defineStore('contact_newsletters', {
  state: (): ContactNewsletterState => {
    return {
      resource: '/contact_newsletters',
      ...crudState
    }
  }
})
