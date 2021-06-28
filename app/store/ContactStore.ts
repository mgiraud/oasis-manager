import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/AbstractStore'

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
}

class ContactStore extends PersistentApiStore<ContactState, Contact> {
  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: Contact): RawLocation | null {
    return {
      name: 'admin-contact-id',
      params: {
        id: item.id.toString()
      }
    }
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-contact' };
  }

  deleteRole = 'USER_CAN_DELETE_CONTACT'
  editRole = 'USER_CAN_EDIT_CONTACT'
  listRole = 'USER_CAN_VIEW_CONTACT'

  getCreateMessage(contact: Contact) {
    return 'Ta prise de contact a bien été enregistrée, nous reviendrons vers toi aussi rapidement que possible'
  }
}

export const contactStore = new ContactStore('contacts')
