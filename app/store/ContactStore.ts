import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'

export type Contact = HydraMemberObject & {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  content: string
  subject: string
}

interface ContactState extends CrudState<Contact> {
}

class ContactStore extends PersistentApiStore<ContactState, Contact> {
  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: Contact): RawLocation | null {
    return {
      name: 'contact-id',
      params: {
        id: item.email
      }
    }
  }

  getIdentifierFromUrlParam (param: string): string {
    return '';
  }

  getListLocation (): RawLocation | null {
    return null;
  }
}

export const contactStore = new ContactStore('contacts')
