<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <h2>J'en dis un peu sur moi :</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.email"
            prepend-inner-icon="ri-mail-line"
            label="Email *"
            :error-messages="emailErrors"
            required
            @input="v$.email.$touch()"
            @blur="v$.email.$touch()"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model="item.phoneNumber"
            prepend-inner-icon="ri-phone-line"
            label="Numéro de téléphone"
            :error-messages="phoneNumberErrors"
            @input="v$.phoneNumber.$touch()"
            @blur="v$.phoneNumber.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.firstName"
            label="Prénom *"
            :error-messages="firstNameErrors"
            @input="v$.firstName.$touch()"
            @blur="v$.firstName.$touch()"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model="item.lastName"
            label="Nom *"
            :error-messages="lastNameErrors"
            @input="v$.lastName.$touch()"
            @blur="v$.lastName.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.city"
            label="Ville actuelle *"
            :error-messages="cityErrors"
            @input="v$.city.$touch()"
            @blur="v$.city.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="item.origin"
            label="Comment nous as-tu connu ?"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-checkbox
            v-model="item.acceptance"
            label="En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association « les Transalpins » ne faisant pas partie du bureau"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <label class="v-label">De combien de personnes est composé ton foyer, prénom et âge des
            membres du foyer ?</label>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
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
        <v-col
          cols="12"
          md="6"
        >
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
        <v-col
          cols="12"
          md="6"
        >
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
        <v-col
          cols="12"
          md="6"
        >
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
          <h2>Quelle est ma raison d'être ? Quelles sont mes motivations pour rejoindre ce projet
            ?</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="v-label">
            Dans les termes ci-dessous, quels sont ceux, quelques-uns qui définiraient le mieux ta
            motivation initiale à créer une oasis ? Les classer par ordre d’importance, le plus
            important en premier. (Utilise le cliquer-glisser)
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
            Quelles sont les valeurs essentielles que tu aimerais vivre : les valeurs non
            négociables, c-a-d dont l'absence ferait pour toi perdre son sens au projet et ta
            motivation à y participer ?
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
            v-model="item.bring"
            label="Qu'est tu prêt.e à lui apporter ?"
            hint="(En plus de ce que tu peux apporter dans la vie quotidienne, développez ici des projets professionnels/rémunérateurs ou autre que tu souhaiterais mettre en place en marge de l'oasis et un exemple de fonctionnement)."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="item.investment"
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
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength } from '@vuelidate/validators'
import has from 'lodash/has'
import VuetifyDraggableTreeview from 'vuetify-draggable-treeview'
import { FormErrors } from '~/api/repository'
import { SurveyJoin } from '~/custom-store/SurveyJoinStore'

export default defineComponent({
  components: {
    VuetifyDraggableTreeview
  },
  props: {
    values: {
      type: Object as () => SurveyJoin,
      required: true
    },
    errors: {
      type: Object as () => FormErrors,
      default: () => {}
    }
  },
  setup (props) {
    const item = computed(() => props.values)

    const validation = computed(() => ({
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
    }))

    const v$ = useVuelidate(validation, item)

    const violations = computed(() => props.errors)

    const emailErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.email || !v$.value.email.$dirty) {
        return errors
      }
      has(violations.value, 'email') && errors.push(violations.value.email)
      v$.value.email.email.$invalid && errors.push('Cet email n\'est pas valide')
      v$.value.email.required.$invalid && errors.push('l\'email est obligatoire')
      return errors
    })

    const firstNameErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.firstName || !v$.value.firstName.$dirty) {
        return errors
      }
      has(violations.value, 'firstName') && errors.push(violations.value.firstName)
      v$.value.firstName.maxLength.$invalid && errors.push('Le prénom doit faire au maximum 60 caractères')
      v$.value.firstName.required.$invalid && errors.push('Le prénom doit être renseigné')
      return errors
    })

    const lastNameErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.lastName || !v$.value.lastName.$dirty) {
        return errors
      }
      has(violations.value, 'lastName') && errors.push(violations.value.lastName)
      v$.value.lastName.maxLength.$invalid && errors.push('Le nom doit faire au maximum 60 caractères')
      v$.value.lastName.required.$invalid && errors.push('Le nom doit être renseigné')
      return errors
    })

    const phoneNumberErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.phoneNumber || !v$.value.phoneNumber.$dirty) {
        return errors
      }
      has(violations.value, 'phoneNumber') && errors.push(violations.value.phoneNumber)
      v$.value.phoneNumber.maxLength.$invalid && errors.push('Le téléphone doit faire au maximum 12 caractères')
      return errors
    })

    const cityErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.city || !v$.value.city.$dirty) {
        return errors
      }
      has(violations.value, 'city') && errors.push(violations.value.city)
      v$.value.city.required.$invalid && errors.push('La ville doit être renseignée')
      return errors
    })

    const increment = (index: number) => {
      if (item.value.family[index].age === null) {
        item.value.family[index].age = 0
      }
      item.value.family[index].age = parseInt(item.value.family[index].age, 10) + 1
    }

    const decrement = (index: number) => {
      if (item.value.family[index].age === null) {
        item.value.family[index].age = 0
      }
      item.value.family[index].age = parseInt(item.value.family[index].age, 10) - 1
    }

    return {
      item,
      v$,
      emailErrors,
      firstNameErrors,
      lastNameErrors,
      phoneNumberErrors,
      cityErrors,
      increment,
      decrement
    }
  }
})
</script>

<style lang="scss">
.v-treeview-node__label {
  cursor: pointer;
}
</style>
