<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Contacte-nous !</v-card-title>
          <v-card-text>
            <PageModel
              v-if="page"
              :page="page"
            />
            <div v-else>
              <p>Pour nous contacter tu peux nous envoyer un email à <a
                href="mailto:contact@lestransalpins.org"
                title="Envoyer un email aux transalpins"
              >contact@lestransalpins.org</a> ou bien remplir le formulaire suivant.</p>
              <p>Dans ce cas tu recevras un email de confirmation ou bien regarde dans tes spams si
                ce n'est pas le cas.</p>
            </div>
            <contact-form
              ref="createForm"
              :values="item"
              :errors="contactState.violations"
            />
            <toolbar
              :handle-submit="onSendForm"
              :handle-reset="resetForm"
            />
            <Loading :visible="contactState.isLoading" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { defineComponent, ref, useContext, watch, useRouter } from '@nuxtjs/composition-api'
import ContactForm from '../components/contact/Form.vue'
import Toolbar from '../components/form/Toolbar.vue'
import Loading from '../components/util/Loading.vue'
import { Contact } from '~/store/contact'
import { ElementWithValidation } from '~/vue-shim'
import PageModel from '~/components/page/PageModel.vue'
import { contactStore } from '~/store/ContactStore'
import { notificationStore } from '~/store/NotificationStore'
import { pageStore } from '~/store/PageStore'

export default defineComponent({
  components: {
    PageModel,
    ContactForm,
    Toolbar,
    Loading
  },
  setup () {
    const context = useContext()
    const router = useRouter()
    contactStore.setContext(context)
    pageStore.setContext(context)
    const item = ref({ content: null })

    watch(() => contactStore.getState().violations, (violations: string[] | null) => {
      if (violations && violations['']) {
        notificationStore.setTimeout(10000)
        notificationStore.showError(violations[''])
      }
    })

    watch(() => contactStore.getState().created, (created: Contact) => {
      if (!created) {
        return
      }
      notificationStore.showMessage('Ta prise de contact a bien été enregistrée, nous reviendrons vers toi aussi rapidement que possible')
      router.push({ path: '/' })
    })

    watch(() => contactStore.getState().error, (message: string) => {
      message && notificationStore.showError(message)
    })

    return {
      item,
      contactState: contactStore.getState(),
      createContact: (contact: Contact) => contactStore.create(contact),
      notificationState: notificationStore.getState(),
      page: pageStore.find('/api/pages/contact')
    }
  },
  head () {
    return {
      title: this.page ? this.page.title : 'Contacte-nous !'
    }
  },
  methods: {
    resetForm () {
      (this.$refs.createForm as ElementWithValidation).$v.$reset()
      this.item = {
        content: null
      }
    },
    onSendForm () {
      const createForm = this.$refs.createForm as ElementWithValidation
      createForm.$v.$touch()
      if (!createForm.$v.$invalid) {
        this.createContact(createForm.$v.item.$model)
      }
    }
  }
})
</script>
