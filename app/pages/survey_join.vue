<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Tu souhaites nous rejoindre ?</v-card-title>
          <v-card-text>
            <div
              v-if="page"
              v-html="page.content"
            />
            <v-container v-else>
              <v-row>
                <v-col cols="12">
                  Avant de remplir le question, merci de prendre connaissance des éléments suivants
                  :
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-img
                    :src="require(`~/assets/img/join_process_1.png`)"
                    contain
                  />
                </v-col>
                <v-col cols="6">
                  <v-img
                    :src="require(`~/assets/img/join_process_2.png`)"
                    contain
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  Tu peux remplir ce questionnaire en ligne ou bien <a
                  :href="downloadPdfUrl"
                  title="Télécharger le formulaire"
                  target="_blank"
                >Télécharger le PDF</a> pour le remplir numériquement ou manuellement et nous
                  l'envoyer à l'addresse suivante : <a
                  href="mailto:contact@lestransalpins.org"
                  title="Contacter les transalpins"
                >contact@lestransalpins.org</a>
                </v-col>
              </v-row>
            </v-container>
            <survey-join-form
              ref="createForm"
              :values="item"
              :errors="surveyJoinState.violations"
            />
            <toolbar
              :handle-submit="onSendForm"
              :handle-reset="resetForm"
            />
            <Loading :visible="surveyJoinState.isLoading" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import SurveyJoinForm from '../components/survey-join/Form.vue'
import Toolbar from '../components/form/Toolbar.vue'
import Loading from '../components/util/Loading.vue'
import { SurveyJoin } from '~/store/SurveyJoinStore'
import { ElementWithValidation } from '~/vue-shim'
import { defineComponent, ref, useContext, watch, useRouter } from '@nuxtjs/composition-api'
import { surveyJoinStore } from '~/store/SurveyJoinStore'
import { pageStore } from '~/store/PageStore'
import { notificationStore } from '~/store/NotificationStore'

const initialItem = {
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

export default defineComponent({
  components: {
    SurveyJoinForm,
    Toolbar,
    Loading
  },
  setup () {
    const context = useContext()
    const router = useRouter()
    pageStore.setContext(context)
    surveyJoinStore.setContext(context)

    const item = ref({ ...initialItem })

    watch(() => surveyJoinStore.getState().violations, (violations: string[] | null) => {
      if (violations && violations['']) {
        notificationStore.setTimeoutDuration(10000)
        notificationStore.showError(violations[''])
      }
    })

    watch(() => surveyJoinStore.getState().created, () => {
      notificationStore.showMessage('Le questionnaire a correctement été enregistré, nous prendrons contact avec toi le plus rapidement possible')
      router.push({ name: 'index' })
    })

    return {
      item,
      downloadPdfUrl: process.env.apiBaseUrl + (process.env.apiBaseUrl?.endsWith('/') ? '' : '/') + '../app-assets/files/questionnaire_transalpins_v1.pdf',
      page: pageStore.find('/api/pages/survey-join'),
      surveyJoinState: surveyJoinStore.getState()
    }
  },
  head () {
    return {
      title: this.page ? this.page.title : 'Rejoins le groupe fondateur !'
    }
  },
  methods: {
    create (data: SurveyJoin) {
      data.motivations = data.motivationsRaw.map(motivation => motivation.id)
      data.acceptance = !!data.acceptance
      surveyJoinStore.create(data)
    },
    resetForm () {
      const createForm = this.$refs.createForm as ElementWithValidation
      createForm.$v.$reset()
      this.item = { ...initialItem }
    },
    onSendForm () {
      const createForm = this.$refs.createForm as ElementWithValidation
      createForm.$v.$touch()
      if (!createForm.$v.$invalid) {
        this.create(createForm.$v.item.$model)
      }
    }
  }
})
</script>
