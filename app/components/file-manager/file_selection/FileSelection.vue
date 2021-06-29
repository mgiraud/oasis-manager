<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Fichiers sélectionnés</h3>
      </v-col>
    </v-row>
    <v-row v-if="thumbnails.length + links.length === 0">
      <v-col>
        <p>
          Tu peux téleverser un fichier ou utiliser le navigateur pour sélectionner les fichiers à
          insérer
        </p>
      </v-col>
    </v-row>
    <v-row
      v-else
      no-gutters
    >
      <v-col>
        <v-container>
          <v-row no-gutters>
            <v-col
              v-for="(thumbnail, i) in thumbnails"
              :key="i"
              cols="4"
              align-self="center"
            >
              <v-card>
                <v-img
                  :src="thumbnail.src"
                  max-height="200"
                  contain
                />
                <v-card-actions>
                  <v-btn
                    class="btn-remove-thumbnail"
                    fab
                    dark
                    x-small
                    color="error"
                    @click="removeThumbnail(i)"
                  >
                    <v-icon dark>
                      ri-close-line
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(link, i) in links"
              :key="i"
            >
              <span>{{ link.name }}<v-btn
                class="btn-remove-thumbnail"
                fab
                dark
                x-small
                color="error"
                @click="removeLink(i)"
              >
                <v-icon dark>
                  ri-close-line
                </v-icon>
              </v-btn></span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    thumbnails: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: true
    },
    removeThumbnail: {
      type: Function,
      required: true
    },
    removeLink: {
      type: Function,
      required: true
    }
  }
})
</script>
