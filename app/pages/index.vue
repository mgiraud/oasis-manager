<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Bienvenue chez les transalpins !</v-card-title>
          <v-card-text>
            Vous retrouverez sur ce site toutes les informations relatives au projet de création d'un habitat partagé
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const securityModule = namespace('security')

@Component
export default class IndexVue extends Vue {
  @securityModule.Getter('isLoggedIn') isLoggedIn!: boolean;
  @securityModule.Action('logout') logout!: () => void
}
</script>
