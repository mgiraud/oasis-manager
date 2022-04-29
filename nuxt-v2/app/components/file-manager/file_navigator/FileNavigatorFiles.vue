<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in mediaObjects"
        :key="item['@id']"
        cols="12"
        md="6"
        lg="3"
      >
        <v-card>
          <v-img
            v-if="item.isImage"
            :src="item.contentUrl"
            max-height="300"
            contain
            class="file-navigator-object"
          />
          <span
            v-else
            class="file-navigator-object"
          >{{ item.filePath }}</span>
          <v-card-title>
            <span v-if="item.customName">{{ item.customName }}</span>
            <small v-else>Titre non défini</small>
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-tooltip
              v-if="selectionEnabled"
              top
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  icon
                  v-on="on"
                  @click="selectClickHandler(item)"
                >
                  <v-icon>ri-arrow-left-up-line</v-icon>
                </v-btn>
              </template>
              <span>Sélectionner l'image</span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  icon
                  v-on="on"
                  @click="editClickHandler(item)"
                >
                  <v-icon>ri-pencil-line</v-icon>
                </v-btn>
              </template>
              <span>Editer les propriétés de l'image</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, useContext, watch } from '@nuxtjs/composition-api'
import { MediaNode } from '../../../custom-store/MediaNodeStore'
import { mediaObjectStore } from '../../../custom-store/MediaObjectStore'

export default defineComponent({
  props: {
    mediaNode: {
      type: Object as () => MediaNode | null,
      required: true
    },
    selectClickHandler: {
      type: Function,
      required: true
    },
    editClickHandler: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const context = useContext()
    const selectionEnabled = inject<boolean>('selectionEnabled')
    mediaObjectStore.setContext(context)

    const loadObjects = () => {
      if (props.mediaNode) {
        mediaObjectStore.fetchAll({
          mediaNodes: props.mediaNode['@id']
        })
      }
    }

    onMounted(() => {
      loadObjects()
    })

    watch(() => props.mediaNode, (mediaNode: MediaNode | null) => {
      loadObjects()
    })

    return {
      selectionEnabled,
      mediaObjects: mediaObjectStore.list,
      loadObjects
    }
  }
})
</script>
