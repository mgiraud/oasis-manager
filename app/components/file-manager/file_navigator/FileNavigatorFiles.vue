<template>
  <div class="flex flex-row">
      <div
        v-for="item in mediaObjects"
        :key="item['@id']"
      >
        <div>
          <img
            v-if="item.isImage"
            :src="item.contentUrl"
            class="file-navigator-object max-h-80"
          />
          <span
            v-else
            class="file-navigator-object"
          >{{ item.filePath }}</span>
          <div>
            <span v-if="item.customName">{{ item.customName }}</span>
            <small v-else>Titre non défini</small>
          </div>
          <div>
<!--            <v-spacer />-->
<!--            <v-tooltip-->
<!--              v-if="selectionEnabled"-->
<!--              top-->
<!--            >-->
<!--              <template #activator="{ on, attrs }">-->
<!--                <v-btn-->
<!--                  v-bind="attrs"-->
<!--                  icon-->
<!--                  v-on="on"-->
<!--                  @click="props.selectClickHandler(item)"-->
<!--                >-->
<!--                  <v-icon>ri-arrow-left-up-line</v-icon>-->
<!--                </v-btn>-->
<!--              </template>-->
<!--              <span>Sélectionner l'image</span>-->
<!--            </v-tooltip>-->
<!--            <v-tooltip top>-->
<!--              <template #activator="{ on, attrs }">-->
<!--                <v-btn-->
<!--                  v-bind="attrs"-->
<!--                  icon-->
<!--                  v-on="on"-->
<!--                  @click="props.editClickHandler(item)"-->
<!--                >-->
<!--                  <v-icon>ri-pencil-line</v-icon>-->
<!--                </v-btn>-->
<!--              </template>-->
<!--              <span>Editer les propriétés de l'image</span>-->
<!--            </v-tooltip>-->
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { MediaNode } from '~/store/media-node'
import { useMediaObjectStore } from '~/store/media-object'

interface FileNavigatorProps {
  mediaNode?: MediaNode | null,
  selectClickHandler: Function,
  editClickHandler: Function
}

const props = withDefaults(defineProps<FileNavigatorProps>(), {
  mediaNode: null
})

const selectionEnabled = inject<boolean>('selectionEnabled')
const mediaObjectStore = useMediaObjectStore()

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
</script>
