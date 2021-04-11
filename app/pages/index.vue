<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Bienvenue chez les transalpins !</v-card-title>
          <Template v-if="page" :page="page" />
          <v-card-text v-else>
            Tu peux retrouver sur ce site toutes les informations relatives au projet de création d'un habitat partagé
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Template from '~/components/page/Template.vue'
import { Page } from '~/store/page'

const securityModule = namespace('security')
const pageModule = namespace('page')

@Component({
  components: {
    Template
  }
})
export default class IndexVue extends Vue {
  @securityModule.Action('logout') logout!: () => void
  @pageModule.Getter('find') find!: (url: string) => Page | null

  get page (): Page | null {
    return this.find('/api/pages/home')
  };
}
</script>
