import { RawLocation } from 'vue-router'
import { HydraMemberObject } from '~/api/hydra'
import { CrudState, PersistentApiStore } from '~/store/main'

export type ContactNewsletter = HydraMemberObject & {
  email: string,
  createdAt: string
}

interface ContactNewsletterState extends CrudState<ContactNewsletter> {
}

class ContactNewsletterStore extends PersistentApiStore<ContactNewsletterState, ContactNewsletter> {
  getAddLocation (): RawLocation | null {
    return null
  }

  getEditLocation (item: ContactNewsletter): RawLocation | null {
    return null
  }

  getListLocation (): RawLocation | null {
    return { name: 'admin-contact-newsletter' };
  }

  deleteRole = 'USER_CAN_DELETE_CONTACT_NEWSLETTER'
  editRole = 'USER_CAN_EDIT_CONTACT_NEWSLETTER'
  listRole = 'USER_CAN_VIEW_CONTACT_NEWSLETTER'
}

export const contactNewsletterStore = new ContactNewsletterStore('contact_newsletters')
