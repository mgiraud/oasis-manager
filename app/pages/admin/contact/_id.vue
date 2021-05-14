<template>
  <v-container fluid>
    <v-row v-if="item">
      <v-col cols="12">
        <ul class="contact-informations">
          <h3>Informations du contact</h3>
          <li><v-icon>ri-mail-line</v-icon> {{ item.email }}</li>
          <li><v-icon>ri-phone-line</v-icon> {{ item.phoneNumber || 'Non précisé' }}</li>
          <li>Prénom : {{ item.firstName || 'Non précisé' }}</li>
          <li>Nom : {{ item.lastName || 'Non précisé' }}</li>
        </ul>
      </v-col>
      <v-col cols="12">
        Sujet : <b class="primary--text text--darken-3">{{ item.subject }}</b>
      </v-col>
      <v-col cols="12">
        <textarea v-model="item.content" readonly class="content-textarea primary white--text" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Toolbar
          :handle-back="back"
        />
      </v-col>
    </v-row>
    <Loading :visible="isLoading" />
  </v-container>
</template>
<script lang="ts">
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import show from '~/mixins/show'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import ContactForm from '~/components/contact/Form.vue'
import { Contact } from '~/store/contact'

const contactModule = namespace('page')

@Component({
  components: {
    Loading, Toolbar, ContactForm
  },
  servicePrefix: 'admin-contact',
  resourcePrefix: '/api/contacts/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_VIEW_CONTACT']
  }
})
export default class ContactView extends mixins(show) {
  @contactModule.State('isLoading') isLoading!: boolean
  @contactModule.Getter('find') find!: (id: string) => Contact | null
  @contactModule.Action('load') retrieve!: (id: string) => void
}
</script>

<style lang="scss" scoped>
ul.contact-informations {
  list-style-type: none;
}

.content-textarea {
  width: 100%;
  padding : 10px;
  min-height: 200px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>>
