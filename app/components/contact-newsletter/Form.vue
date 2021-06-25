<template>
  <v-form @submit.prevent="sendForm">
    <v-text-field
      v-model="item.email"
      label="Inscris-toi à la newsletter !"
      :error-messages="emailErrors"
      class="newsletter-input"
      prepend-icon="ri-mail-line"
      append-outer-icon="ri-send-plane-fill"
      @input="$v.item.email.$touch()"
      @blur="$v.item.email.$touch()"
      @click:append-outer="sendForm"
    />
  </v-form>
</template>

<script lang="ts">
import { Component, mixins, namespace, Prop, Watch } from 'nuxt-property-decorator'
import { email } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'
import { ContactNewsletter } from '~/store/ContactNewsletterStore'
import { FormErrors } from '~/api/repository'
import NotificationMixin from '~/mixins/notification'

const contactNewsletterModule = namespace('contact_newsletter')

@Component({
  validations: {
    item: {
      email: {
        email
      }
    }
  },
  mixins: [validationMixin]
})
export default class ContactNewsletterForm extends mixins(NotificationMixin) {
  item = { email: null }

  @contactNewsletterModule.State('violations') violations !: FormErrors;
  @contactNewsletterModule.State('error') error !: string;
  @contactNewsletterModule.State('created') created !: ContactNewsletter | null;
  @contactNewsletterModule.Action('create') create !: (cn: ContactNewsletter) => ContactNewsletter;

  get emailErrors () {
    const errors: string[] = []
    if (!this.$v.item.email || !this.$v.item.email.$dirty) {
      return errors
    }
    has(this.violations, 'email') && errors.push(this.violations.email)
    !this.$v.item.email.email && errors.push('Cet email n\'est pas valide')
    return errors
  }

  @Watch('created')
  onCreated (created: ContactNewsletter) {
    if (!created) {
      return
    }

    this.item.email = null
    this.showMessage('Tu es maintenant inscrit à la newsletter !')
  }

  @Watch('error')
  onError (message: string) {
    message && this.showError(message)
  }

  sendForm () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      this.create(this.$v.item.$model)
    }
  }
}
</script>

<style scoped>
form {
  margin-right: 20px;
  padding-top:10px;
}
</style>
