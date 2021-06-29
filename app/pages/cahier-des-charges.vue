<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Cahier des charges !</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="text-center">
                  <iframe
                    style="border: none"
                    width="824"
                    height="1000"
                    src="https://docs.google.com/document/d/e/2PACX-1vR1uRoEHWqkGt86ELhUzcfGs2Bm9u0QnD3Yi8vmqFHiCrkuXkf02hQigct6fBelCQ/pub?embedded=true"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head () {
    return {
      title: 'Cahier des charges'
    }
  }
})
</script>
