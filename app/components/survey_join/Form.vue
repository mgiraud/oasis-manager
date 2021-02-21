<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2>J'en dis un peu sur moi :</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.email"
            prepend-inner-icon="mdi-email"
            label="Email"
            :error-messages="emailErrors"
            required
            @input="$v.item.email.$touch()"
            @blur="$v.item.email.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.phoneNumber"
            prepend-inner-icon="mdi-phone"
            label="Numéro de téléphone"
            :error-messages="phoneNumberErrors"
            @input="$v.item.phoneNumber.$touch()"
            @blur="$v.item.phoneNumber.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.firstName"
            label="Prénom"
            :error-messages="firstNameErrors"
            @input="$v.item.firstName.$touch()"
            @blur="$v.item.firstName.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.lastName"
            label="Nom"
            :error-messages="lastNameErrors"
            @input="$v.item.lastName.$touch()"
            @blur="$v.item.lastName.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.city"
            label="Ville actuelle"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.origin"
            label="Comment nous as-tu connu ?"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-checkbox
            v-model="item.acceptance"
            label="Acceptes-tu que cette adresse soit visible par les autres membres du groupe « les Transalpins » ?"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="v-label">De combien de personnes est composé ton foyer, prénom et âge des membres du foyer ?</label>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="item.family[0].firstName"
                label="Prénom"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.family[0].age"
                label="Age"
                append-outer-icon="mdi-numeric-positive-1"
                prepend-icon="mdi-numeric-negative-1"
                @click:append-outer="increment(0)"
                @click:prepend="decrement(0)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="item.family[1].firstName"
                label="Prénom"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.family[1].age"
                label="Age"
                append-outer-icon="mdi-numeric-positive-1"
                prepend-icon="mdi-numeric-negative-1"
                @click:append-outer="increment(1)"
                @click:prepend="decrement(1)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="item.family[2].firstName"
                label="Prénom"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.family[2].age"
                label="Age"
                append-outer-icon="mdi-numeric-positive-1"
                prepend-icon="mdi-numeric-negative-1"
                @click:append-outer="increment(2)"
                @click:prepend="decrement(2)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="item.family[3].firstName"
                label="Prénom"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.number="item.family[3].age"
                label="Age"
                append-outer-icon="mdi-numeric-positive-1"
                prepend-icon="mdi-numeric-negative-1"
                @click:append-outer="increment(3)"
                @click:prepend="decrement(3)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="12">
          <h2>Quelle est ma raison d'être ? Quelles sont mes motivations pour rejoindre ce projet ?</h2>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="12">
          <h2>Suis-je prêt.e à m'investir dans ce projet ?</h2>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="12">
          <h2>Ma vie au quotidien </h2>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col cols="12">
          <h2>Mes savoir-faire et savoir-être</h2>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { required, email, maxLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'

export default {
  name: 'ContactForm',
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    errors: {
      type: Object,
      default: () => {
      }
    },
    initialValues: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    item () {
      return this.initialValues || this.values
    },
    emailErrors () {
      const errors = []
      if (!this.$v.item.email.$dirty) {
        return errors
      }
      has(this.violations, 'email') && errors.push(this.violations.email)
      !this.$v.item.email.required && errors.push('l\'email est obligatoire')
      !this.$v.item.email.email && errors.push('Cet email n\'est pas valide')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.$v.item.firstName.$dirty) {
        return errors
      }
      has(this.violations, 'firstName') && errors.push(this.violations.firstName)
      !this.$v.item.firstName.maxLength && errors.push('Le prénom doit faire au maximum 60 caractères')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.item.lastName.$dirty) {
        return errors
      }
      has(this.violations, 'lastName') && errors.push(this.violations.lastName)
      !this.$v.item.lastName.maxLength && errors.push('Le nom doit faire au maximum 60 caractères')
      return errors
    },
    phoneNumberErrors () {
      const errors = []
      if (!this.$v.item.phoneNumber.$dirty) {
        return errors
      }
      has(this.violations, 'phoneNumber') && errors.push(this.violations.phoneNumber)
      !this.$v.item.phoneNumber.maxLength && errors.push('Le téléphone doit faire au maximum 12 caractères')
      return errors
    },
    violations () {
      return this.errors || {}
    }
  },
  methods: {
    increment (index) {
      if (this.item.family[index].age === null) {
        this.item.family[index].age = 0
      }
      this.item.family[index].age = parseInt(this.item.family[index].age, 10) + 1
    },
    decrement (index) {
      if (this.item.family[index].age === null) {
        this.item.family[index].age = 0
      }
      this.item.family[index].age = parseInt(this.item.family[index].age, 10) - 1
    }
  },
  validations: {
    item: {
      email: {
        required,
        email
      },
      firstName: {
        maxLength: maxLength(60)
      },
      lastName: {
        maxLength: maxLength(60)
      },
      phoneNumber: {
        maxLength: maxLength(12)
      }
    }
  }
}
</script>
