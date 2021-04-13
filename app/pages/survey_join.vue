<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Tu souhaites nous rejoindre ?</v-card-title>
          <v-card-text>
            <div v-if="page" v-html="page.content" />
            <v-container v-else>
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
                  Tu peux remplir ce questionnaire en ligne ou bien <a :href="downloadPdfUrl" title="Télécharger le formulaire" target="_blank">Télécharger le PDF</a> pour le remplir numériquement ou manuellement et nous l'envoyer à l'addresse suivante : @AJOUTER
                </v-col>
              </v-row>
            </v-container>
            <survey-join-form ref="createForm" :values="item" :errors="violations" />
            <toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
            <Loading :visible="isLoading" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, namespace, Watch, mixins } from 'nuxt-property-decorator'
import SurveyJoinForm from '../components/survey_join/Form.vue'
import Toolbar from '../components/form/Toolbar.vue'
import Loading from '../components/util/Loading.vue'
import NotificationMixin from '~/mixins/notification'
import { SurveyJoin } from '~/store/survey_join'
import { ElementWithValidation } from '~/vue-shim'
import Template from '~/components/page/Template.vue'
import { Page } from '~/store/page'

const surveyJoinModule = namespace('survey_join')
const notificationModule = namespace('notifications')
const pageModule = namespace('page')

@Component({
  components: {
    SurveyJoinForm,
    Toolbar,
    Loading
  },
  // @ts-ignore
  servicePrefix: 'survey_join',
  resourcePrefix: '/api/survey_joins/'
})
export default class SurveyJoinPage extends mixins(NotificationMixin) {
  item = {
    family: [{ firstName: null, age: null }, { firstName: null, age: null }, { firstName: null, age: null }, { firstName: null, age: null }],
    motivationsRaw: [
      { name: 'Activité artistique', id: 'arts' },
      { name: 'Amour de la nature', id: 'nature' },
      { name: 'Autonomie', id: 'autonomy' },
      { name: 'Collapsologie', id: 'collapsology' },
      { name: 'Écologie', id: 'ecology' },
      { name: 'Rêve d’enfant', id: 'child_dream' },
      { name: 'Solidarité', id: 'solidarity' },
      { name: 'Intergénérationnel', id: 'intergenerational' },
      { name: 'Transmission', id: 'legacy' },
      { name: 'Vivre ensemble', id: 'live_together' }
    ]
  }

  downloadPdfUrl = process.env.apiBaseUrl + (process.env.apiBaseUrl?.endsWith('/') ? '' : '/') + '../app-assets/files/questionnaire_transalpins_v1.pdf'

  @surveyJoinModule.State('error') error!: string | null;
  @surveyJoinModule.State('isLoading') isLoading!: boolean;
  @surveyJoinModule.State('created') created!: SurveyJoin;
  @surveyJoinModule.State('violations') violations!: string[];

  @surveyJoinModule.Action('reset') reset !: () => void
  @surveyJoinModule.Action('create') createSurvey!: (survey: SurveyJoin) => SurveyJoin;
  @notificationModule.Action('setTimeout') setTimeoutDuration!: (show: number) => void

  @pageModule.Getter('find') find!: (url: string) => Page | null

  get page (): Page | null {
    return this.find('/api/pages/survey-join')
  };

  create (data: SurveyJoin) {
    data.motivations = data.motivationsRaw.map(motivation => motivation.id)
    data.acceptance = !!data.acceptance
    this.createSurvey(data)
  }

  resetForm () {
    const createForm = this.$refs.createForm as ElementWithValidation
    createForm.$v.$reset()
    this.item = {
      family: [{ firstName: null, age: null }, { firstName: null, age: null }, { firstName: null, age: null }, { firstName: null, age: null }],
      motivationsRaw: [
        { name: 'Activité artistique', id: 'arts' },
        { name: 'Amour de la nature', id: 'nature' },
        { name: 'Autonomie', id: 'autonomy' },
        { name: 'Collapsologie', id: 'collapsology' },
        { name: 'Écologie', id: 'ecology' },
        { name: 'Rêve d’enfant', id: 'child_dream' },
        { name: 'Solidarité', id: 'solidarity' },
        { name: 'Intergénérationnel', id: 'intergenerational' },
        { name: 'Transmission', id: 'legacy' },
        { name: 'Vivre ensemble', id: 'live_together' }
      ]
    }
  }

  onSendForm () {
    const createForm = this.$refs.createForm as ElementWithValidation
    createForm.$v.$touch()
    if (!createForm.$v.$invalid) {
      this.create(createForm.$v.item.$model)
    }
  }

  @Watch('violations')
  onViolationsChanged (violations: string[] | null) {
    // @ts-ignore
    if (violations && violations['']) {
      this.setTimeoutDuration(10000)
      // @ts-ignore
      this.showError(violations[''])
    }
  }

  @Watch('created')
  onCreated (_: SurveyJoin) {
    this.showMessage('Le questionnaire a correctement été enregistré, nous prendrons contact avec toi le plus rapidement possible')

    this.$router.push({ name: 'index' })
  }
}
</script>
