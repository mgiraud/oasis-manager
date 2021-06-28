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
              :errors="state.violations"
            />
            <toolbar
              :handle-submit="onSendForm"
              :handle-reset="resetForm"
            />
            <Loading :visible="state.isLoading" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { defineComponent, ref, useContext, toRefs, useRouter } from '@nuxtjs/composition-api'
import itemCreate from '~/composable/ItemCreate'
import ContactForm from '../components/contact/Form.vue'
import Toolbar from '../components/form/Toolbar.vue'
import Loading from '../components/util/Loading.vue'
import PageModel from '~/components/page/PageModel.vue'
import { contactStore } from '~/store/ContactStore'
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
    contactStore.setContext(context)
    pageStore.setContext(context)
    const item = ref({ content: null })

    return {
      item,
      page: pageStore.find('/api/pages/contact'),
      ...toRefs(itemCreate(contactStore, {
        admin: false
      })),
    }
  },
  head () {
    return {
      title: this.page ? this.page.title : 'Contacte-nous !'
    }
  },
})
</script>
