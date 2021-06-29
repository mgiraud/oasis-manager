<template>
  <v-container fluid>
    <v-row v-if="item">
      <v-col cols="12">
        <h3>Informations du contact</h3>
        <ul class="contact-informations">
          <li>
            <v-icon>ri-mail-line</v-icon>
            {{ item.email }}
          </li>
          <li>
            <v-icon>ri-phone-line</v-icon>
            {{ item.phoneNumber || 'Non précisé' }}
          </li>
          <li>Prénom : {{ item.firstName || 'Non précisé' }}</li>
          <li>Nom : {{ item.lastName || 'Non précisé' }}</li>
        </ul>
      </v-col>
      <v-col cols="12">
        Sujet : <b class="primary--text text--darken-3">{{ item.subject }}</b>
      </v-col>
      <v-col cols="12">
        <label>
          <textarea
            v-model="item.content"
            readonly
            class="content-textarea primary white--text"
          />
        </label>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Toolbar
          :handle-back="back"
        />
      </v-col>
    </v-row>
    <Loading :visible="state.isLoading" />
  </v-container>
</template>
<script lang="ts">
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import itemUpdate from '~/composable/itemUpdate'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import { contactStore } from '~/custom-store/ContactStore'

export default defineComponent({
  components: {
    Loading, Toolbar
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_VIEW_CONTACT']
  },
  setup () {
    contactStore.setContext(useContext())

    return {
      ...toRefs(itemUpdate(contactStore))
    }
  }
})
</script>

<style
  lang="scss"
  scoped
>
ul.contact-informations {
  list-style-type: none;
}

.content-textarea {
  width: 100%;
  padding: 10px;
  min-height: 200px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>>
