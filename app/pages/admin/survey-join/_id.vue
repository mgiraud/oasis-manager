<template>
  <v-container fluid>
    <v-row v-if="item">
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col>
              <ul class="contact-informations">
                <h3>Informations du contact</h3>
                <li><v-icon>ri-mail-line</v-icon> {{ item.email }}</li>
                <li><v-icon>ri-phone-line</v-icon> {{ item.phoneNumber || 'Non précisé' }}</li>
                <li>Prénom : {{ item.firstName || 'Non précisé' }}</li>
                <li>Nom : {{ item.lastName || 'Non précisé' }}</li>
                <li>Ville : {{ item.city || 'Non précisé' }}</li>
              </ul>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="item.origin"
                readonly
                label="Comment nous as-tu connu ?"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-checkbox
                v-model="item.acceptance"
                readonly
                label="En cochant cette case tu acceptes que ces informations soient visibles par les membres de l'association « les Transalpins » ne faisant pas partie du bureau"
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <label class="v-label">De combien de personnes est composé ton foyer, prénom et âge des membres du foyer ?</label>
            </v-col>
            <v-col v-if="item.family.length > 0" cols="12" md="6">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.family[0].firstName"
                    readonly
                    label="Prénom"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="item.family[0].age"
                    readonly
                    label="Age"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="item.family.length > 1" cols="12" md="6">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.family[1].firstName"
                    readonly
                    label="Prénom"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="item.family[1].age"
                    readonly
                    label="Age"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="item.family.length > 2" cols="12" md="6">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.family[2].firstName"
                    readonly
                    label="Prénom"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="item.family[2].age"
                    readonly
                    label="Age"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="item.family.length > 3" cols="12" md="6">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.family[3].firstName"
                    readonly
                    label="Prénom"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="item.family[3].age"
                    readonly
                    label="Age"
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
                Dans les termes ci-dessous, quels sont ceux, quelques-uns qui définiraient le mieux ta motivation initiale à créer une oasis ? Les classer par ordre d’importance, le plus important en premier. (Utilise le cliquer-glisser)
              </p>
              <vuetify-draggable-treeview v-model="item.motivationsRaw" item-disabled="locked" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="item.motivationsFreeThinking"
                readonly
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
                readonly
                label="Valeurs humaines"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.coreValuesOther"
                readonly
                label="Valeurs autres"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-textarea
                v-model="item.affinity"
                readonly
                label="Qu’est-ce qui t'attire dans le projet des transalpins ?"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.questioning"
                readonly
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
                readonly
                label="Qu'est tu prêt.e à lui apporter ?"
                hint="(En plus de ce que tu peux apporter dans la vie quotidienne, développez ici des projets professionnels/rémunérateurs ou autre que tu souhaiterais mettre en place en marge de l'oasis et un exemple de fonctionnement)."
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-textarea
                v-model="item.investment"
                readonly
                label="En tant qu’habitant.e, es-tu prêt.e à investir financièrement ?"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.rent"
                readonly
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
                readonly
                label="Décris une journée type"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.dwelling"
                readonly
                label="Décris ton habitation"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-textarea
                v-model="item.commonAreas"
                readonly
                label="Décrire les espaces communs"
                hint="(Dans le cahier des charges nous avons déjà déterminé des espaces communs indispensables page 3, libre à toi d'en proposer d'autres)"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.relationship"
                readonly
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
                readonly
                label="Connais-tu la CNV ? Si oui quelle est ton expérience ?"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.sharedGovernance"
                readonly
                label="Connais-tu la gouvernance partagée si oui quelle est ton expérience ?"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-textarea
                v-model="item.skills"
                readonly
                label="Quels sont tes savoir-faire/être que tu peux amener au projet"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.limits"
                readonly
                label="Quelles sont test limites ?"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="item.availability"
                readonly
                label="Quelles sont test disponibilités durant la période de montage du projet ? Et tes disponibilités en semaine ?"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-textarea
                v-model="item.meet"
                readonly
                label="Serais-tu disposé.e à rencontrer des élus locaux, des banquiers, architectes… ?"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="item.skillUp"
                readonly
                label="Dans quel domaine utile au projet serais-tu prêt.e à te former ?"
              />
            </v-col>
          </v-row>
        </v-container>
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
import VuetifyDraggableTreeview from 'vuetify-draggable-treeview'
import { Component, mixins, namespace } from 'nuxt-property-decorator'
import show from '~/mixins/show'
import Loading from '~/components/util/Loading.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import ContactForm from '~/components/contact/Form.vue'
import { Contact } from '~/store/contact'
import { HydraMemberObject } from '~/api/hydra'

const surveyJoinModule = namespace('survey_join')

@Component({
  components: {
    Loading, Toolbar, ContactForm, VuetifyDraggableTreeview
  },
  servicePrefix: 'admin-survey-join',
  resourcePrefix: '/api/survey_joins/',
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_VIEW_SURVEY_JOIN']
  }
})
export default class ContactView extends mixins(show) {
  @surveyJoinModule.State('isLoading') isLoading!: boolean
  @surveyJoinModule.Getter('find') find!: (id: string) => Contact | null
  @surveyJoinModule.Action('load') retrieve!: (id: string) => HydraMemberObject | null
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
