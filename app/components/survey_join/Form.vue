<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          Avant de remplir le question, merci de prendre connaissance des éléments suivants :
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-img :src="require(`~/assets/img/join_process_1.png`)" contain />
        </v-col>
        <v-col cols="6">
          <v-img :src="require(`~/assets/img/join_process_2.png`)" contain />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          Tu peux remplir ce questionnaire en ligne ou bien <a :href="downloadPdfUrl">Télécharger le PDF</a> pour le remplir numériquement ou manuellement et nous l'envoyer à l'addresse suivante : @AJOUTER
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <h2>J'en dis un peu sur moi :</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.email"
            prepend-inner-icon="ri-mail-line"
            label="Email *"
            :error-messages="emailErrors"
            required
            @input="$v.item.email.$touch()"
            @blur="$v.item.email.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.phoneNumber"
            prepend-inner-icon="ri-phone-line"
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
            label="Prénom *"
            :error-messages="firstNameErrors"
            @input="$v.item.firstName.$touch()"
            @blur="$v.item.firstName.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.lastName"
            label="Nom *"
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
            label="Ville actuelle *"
            :error-messages="cityErrors"
            @input="$v.item.city.$touch()"
            @blur="$v.item.city.$touch()"
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
            label="En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association « les Transalpins » ne faisant pas partie du bureau"
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
                append-outer-icon="ri-add-line"
                prepend-icon="ri-subtract-line"
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
                append-outer-icon="ri-add-line"
                prepend-icon="ri-subtract-line"
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
                append-outer-icon="ri-add-line"
                prepend-icon="ri-subtract-line"
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
                append-outer-icon="ri-add-line"
                prepend-icon="ri-subtract-line"
                @click:append-outer="increment(3)"
                @click:prepend="decrement(3)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mb-5 mt-4" />
      <v-row>
        <v-col cols="12">
          <h2>Quelle est ma raison d'être ? Quelles sont mes motivations pour rejoindre ce projet ?</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="v-label">
            Dans les termes ci-dessous, quels sont ceux, quelques-uns qui définiraient le mieux ta motivation initiale à créer une oasis ? Les classer par ordre d’importance.
          </p>
          <vuetify-draggable-treeview v-model="item.motivationsRaw" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="item.motivationsFreeThinking"
            label="Qu'est-ce qui te motive à créer ou à t'engager dans un projet d'Oasis ?"
            hint="Tu peux développer à loisir ta réponse."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="v-label">
            Quelles sont les valeurs essentielles que tu aimerais vivre : les valeurs non négociables, c-a-d dont l'absence ferait pour toi perdre son sens au projet et ta motivation à y participer ?
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.coreValuesHuman"
            label="Valeurs humaines"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.coreValuesOther"
            label="Valeurs autres"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.affinity"
            label="Qu’est-ce qui t'attire dans le projet des transalpins ?"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.questioning"
            label="Qu’est-ce qui te questionne dans ce projet ?"
          />
        </v-col>
      </v-row>
      <v-divider class="mb-5 mt-4" />
      <v-row>
        <v-col cols="12">
          <h2>Suis-je prêt.e à m'investir dans ce projet ?</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="item.investment"
            label="Qu'est tu prêt.e à lui apporter ?"
            hint="(En plus de ce que tu peux apporter dans la vie quotidienne, développez ici des projets professionnels/rémunérateurs ou autre que tu souhaiterais mettre en place en marge de l'oasis et un exemple de fonctionnement)."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.bring"
            label="En tant qu’habitant.e, es-tu prêt.e à investir financièrement ?"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.rent"
            label="Es-tu prêt.e à payer un loyer ?"
          />
        </v-col>
      </v-row>
      <v-divider class="mb-5 mt-4" />
      <v-row>
        <v-col cols="12">
          <h2>Ma vie au quotidien</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="v-label">
            Des questions encore plus concrètes : A quoi ressemblera ma vie quand je vivrai là ?
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.typicalDay"
            label="Décris une journée type"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.dwelling"
            label="Décris ton habitation"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.commonAreas"
            label="Décrire les espaces communs"
            hint="(Dans le cahier des charges nous avons déjà déterminé des espaces communs indispensables page 3, libre à toi d'en proposer d'autres)"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.relationship"
            label="Décrire les relations au sein de l'oasis"
            hint="(Nous souhaitons baser notre modèle de gouvernance sur la sociocratie avec des ajustements que nous ferons au fil des expérience)"
          />
        </v-col>
      </v-row>
      <v-divider class="mb-5 mt-4" />
      <v-row>
        <v-col cols="12">
          <h2>Mes savoir-faire et savoir-être</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.cnvExperience"
            label="Connais-tu la CNV ? Si oui quelle est ton expérience ?"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.sharedGovernance"
            label="Connais-tu la gouvernance partagée si oui quelle est ton expérience ?"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.skills"
            label="Quels sont tes savoir-faire/être que tu peux amener au projet"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.limits"
            label="Quelles sont test limites ?"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="item.availability"
            label="Quelles sont test disponibilités durant la période de montage du projet ? Et tes disponibilités en semaine ?"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.meet"
            label="Serais-tu disposé.e à rencontrer des élus locaux, des banquiers, architectes… ?"
          />
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="item.skillUp"
            label="Dans quel domaine utile au projet serais-tu prêt.e à te former ?"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { required, email, maxLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { validationMixin } from 'vuelidate'
import VuetifyDraggableTreeview from 'vuetify-draggable-treeview'
import { Component, mixins, Prop } from 'nuxt-property-decorator'

@Component({
  components: {
    VuetifyDraggableTreeview
  },
  validations: {
    item: {
      email: {
        required,
        email
      },
      firstName: {
        maxLength: maxLength(60),
        required
      },
      lastName: {
        maxLength: maxLength(60),
        required
      },
      phoneNumber: {
        maxLength: maxLength(12)
      },
      city: {
        required
      }
    }
  }
})
export default class SurveyJoinForm extends mixins(validationMixin) {
  @Prop({ type: Object, required: true })
  values!: any

  @Prop({ type: Object, default: () => {} })
  errors!: any

  @Prop({ type: Object, default: () => {} })
  initialValues!: any

  downloadPdfUrl = process.env.apiBaseUrl + (process.env.apiBaseUrl?.endsWith('/') ? '' : '/') + '../survey/join.pdf'

  get item () {
    return this.initialValues || this.values
  }

  get emailErrors () {
    const errors: string[] = []
    if (!this.$v.item.email || !this.$v.item.email.$dirty) {
      return errors
    }
    has(this.violations, 'email') && errors.push(this.violations.email)
    !this.$v.item.email.required && errors.push('l\'email est obligatoire')
    !this.$v.item.email.email && errors.push('Cet email n\'est pas valide')
    return errors
  }

  get firstNameErrors () {
    const errors: string[] = []
    if (!this.$v.item.firstName || !this.$v.item.firstName.$dirty) {
      return errors
    }
    has(this.violations, 'firstName') && errors.push(this.violations.firstName)
    !this.$v.item.firstName.required && errors.push('Le prénom doit être renseignée')
    !this.$v.item.firstName.maxLength && errors.push('Le prénom doit faire au maximum 60 caractères')
    return errors
  }

  get lastNameErrors () {
    const errors: string[] = []
    if (!this.$v.item.lastName || !this.$v.item.lastName.$dirty) {
      return errors
    }
    has(this.violations, 'lastName') && errors.push(this.violations.lastName)
    !this.$v.item.lastName.required && errors.push('Le nom doit être renseignée')
    !this.$v.item.lastName.maxLength && errors.push('Le nom doit faire au maximum 60 caractères')
    return errors
  }

  get phoneNumberErrors () {
    const errors: string[] = []
    if (!this.$v.item.phoneNumber || !this.$v.item.phoneNumber.$dirty) {
      return errors
    }
    has(this.violations, 'phoneNumber') && errors.push(this.violations.phoneNumber)
    !this.$v.item.phoneNumber.maxLength && errors.push('Le téléphone doit faire au maximum 12 caractères')
    return errors
  }

  get cityErrors () {
    const errors: string[] = []
    if (!this.$v.item.city || !this.$v.item.city.$dirty) {
      return errors
    }
    has(this.violations, 'city') && errors.push(this.violations.city)
    !this.$v.item.city.required && errors.push('La ville doit être renseignée')
    return errors
  }

  get violations () {
    return this.errors || {}
  }

  increment (index: number) {
    if (this.item.family[index].age === null) {
      this.item.family[index].age = 0
    }
    this.item.family[index].age = parseInt(this.item.family[index].age, 10) + 1
  }

  decrement (index: number) {
    if (this.item.family[index].age === null) {
      this.item.family[index].age = 0
    }
    this.item.family[index].age = parseInt(this.item.family[index].age, 10) - 1
  }
}
</script>
