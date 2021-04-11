<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Navigateur de fichier</h3>
      </v-col>
    </v-row>
    <v-row v-if="items.length > 0">
      <v-col v-for="item in items" :key="item['@id']">
        {{ item['@id'] }}
        <v-img v-if="item.isImage" :src="item.contentUrl" max-height="200" max-width="200" @click="selectImage(item)" />
        <span v-else @click="selectLink(item)">{{ item.filePath }}</span>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        Aucun fichier disponible
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import { MediaObject } from '~/store/media_object'

const mediaObjectModule = namespace('media_object')

@Component
export default class FileNavigator extends Vue {
    @Prop({ type: Function, required: true }) readonly selectImage!: (image: MediaFunction) => void
    @Prop({ type: Function, required: true }) readonly selectLink!: (link: MediaObject) => void
    @mediaObjectModule.Getter('list') items !: () => MediaObject[]
    @mediaObjectModule.Action('fetchAll') fetchAll!: () => MediaObject[]

    async fetch () {
      return await this.fetchAll()
    }
}
</script>
