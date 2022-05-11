import { defineStore } from 'pinia'
import { CrudState, crudState } from '~/store/crud'
import { HydraMemberObject } from '~/types/hydra'

export interface Contact extends HydraMemberObject {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  content: string
  subject: string
}

interface ContactState extends CrudState<Contact> {
  resource: string
}

export const useContactStore = defineStore('contacts', {
  state: (): ContactState => {
    return {
      resource: '/contacts',
      ...crudState
    }
  }
})
