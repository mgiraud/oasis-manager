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

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('security', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('security', ['logout'])
  }
}
</script>
