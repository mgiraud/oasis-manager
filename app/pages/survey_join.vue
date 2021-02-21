<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Vous souhaitez nous rejoindre ?</v-card-title>
          <v-card-text>
            <survey-join-form ref="createForm" :values="item" :errors="violations" />
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
import SurveyJoinForm from '../components/survey_join/Form'
import notification from '../mixins/notification'
import Toolbar from '../components/form/Toolbar'
import Loading from '../components/util/Loading'
import create from '~/mixins/create'

export default {
  servicePrefix: 'survey_join',
  resourcePrefix: '/api/survey_joins/',
  components: {
    SurveyJoinForm,
    Toolbar,
    Loading
  },
  mixins: [create, notification],
  data: () => ({
    item: {
      family: [{ firstName: null, age: null }, { firstName: null, age: null }, { firstName: null, age: null }, { firstName: null, age: null }]
    }
  }),
  computed: {
    ...mapFields('survey_join', ['error', 'isLoading', 'created', 'violations'])
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
    ...mapActions('survey_join', ['create', 'reset'])
  }
}
</script>
