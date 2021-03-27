<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Contactez-nous !</v-card-title>
          <v-card-text>
            <contact-form ref="createForm" :values="item" :errors="violations" />
            <toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
            <Loading :visible="isLoading" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { Component, namespace, Watch, mixins } from 'nuxt-property-decorator'
import ContactForm from '../components/contact/Form'
import Toolbar from '../components/form/Toolbar'
import Loading from '../components/util/Loading'
import { Contact } from '~/store/contact'
import NotificationMixin from '~/mixins/notification'
import { ElementWithValidation } from '~/types'

const contactModule = namespace('contact')
const notificationModule = namespace('notifications')

@Component({
  // @ts-ignore
  servicePrefix: 'contact',
  resourcePrefix: '/api/contacts/',
  components: {
    ContactForm,
    Toolbar,
    Loading
  }
})
export default class ContactVue extends mixins(NotificationMixin) {
  item = {
    content: null
  }

  @contactModule.State('error') error!: string | null;
  @contactModule.State('isLoading') isLoading!: boolean;
  @contactModule.State('created') created!: Contact;
  @contactModule.State('violations') violations!: string[];

  @contactModule.Action('create') create !: (contact: Contact) => Contact
  @contactModule.Action('reset') reset !: () => void
  @notificationModule.Action('setTimeout') setTimeoutDuration!: (show: number) => void

  resetForm () {
    (this.$refs.createForm as ElementWithValidation).$v.$reset()
    this.item = {
      content: null
    }
  }

  onSendForm () {
    const createForm = this.$refs.createForm as ElementWithValidation
    createForm.$v.$touch()
    if (!createForm.$v.$invalid) {
      this.create(createForm.$v.item.$model)
    }
  }

  @Watch('violations')
  onViolationsChanged (violations: string[] | null) {
    // @ts-ignore
    if (violations && violations['']) {
      this.setTimeoutDuration(10000)
      // @ts-ignore
      this.showError(violations[''])
    }
  }

  @Watch('created')
  onCreated (created: Contact) {
    if (!created) {
      return
    }
    this.showMessage(`Votre prise de contact a bien été enregistrée, nous reviendrons vers toi aussi rapidement que possible`)
    this.$router.push({path: '/'})
  }

  @Watch('error')
  onError (message: string) {
    message && this.showError(message)
  }
}
</script>
