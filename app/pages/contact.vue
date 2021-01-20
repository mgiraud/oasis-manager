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

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import ContactForm from '../components/contact/Form'
import notification from '../mixins/notification'
import Toolbar from '../components/form/Toolbar'
import Loading from '../components/util/Loading'
import create from '~/mixins/create'

export default {
  servicePrefix: 'contact',
  resourcePrefix: '/api/contacts/',
  components: {
    ContactForm,
    Toolbar,
    Loading
  },
  mixins: [create, notification],
  data: () => ({
    item: {
      content: null
    }
  }),
  computed: {
    ...mapFields('contact', ['error', 'isLoading', 'created', 'violations'])
  },
  watch: {
    violations (violations) {
      if (violations && violations['']) {
        this.timeout = 10000
        this.showError(violations[''])
      }
    }
  },
  methods: {
    ...mapActions('contact', ['create', 'reset'])
  }
}
</script>
