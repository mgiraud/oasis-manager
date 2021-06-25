import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'

export type Contact = HydraMemberObject & {
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
}

export const contactStore = new ContactStore('contacts')
