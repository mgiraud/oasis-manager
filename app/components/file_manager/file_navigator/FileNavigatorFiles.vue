<template>
  <v-container>
    <v-row>
      <v-col v-for="item in mediaObjects" :key="item['@id']" cols="12" md="6" lg="3">
        <v-card>
          <v-img
              v-if="item.isImage"
              :src="item.contentUrl"
              max-height="300"
              contain
              class="file-navigator-object"
          >
          </v-img>
          <span v-else class="file-navigator-object">{{
              item.filePath
            }}</span>
          <v-card-title>
            <span v-if="item.customName">{{ item.customName }}</span>
            <small v-else>Titre non défini</small>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top v-if="selectionEnabled">
              <template #activator="{ on, attrs }">
                <v-btn icon @click="selectClickHandler(item)" v-on="on" v-bind="attrs">
                  <v-icon>ri-arrow-left-up-line</v-icon>
                </v-btn>
              </template>
              <span>Sélectionner l'image</span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn icon @click="editClickHandler(item)" v-on="on" v-bind="attrs">
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
import { Component, Vue, Prop, namespace, Watch, Inject } from 'nuxt-property-decorator'
import { MediaGalleryItem } from '~/store/media_gallery_item'
import { MediaObject } from '~/store/media_object'

const mediaObjectModule = namespace('media_object')

@Component
export default class FileNavigatorFiles extends Vue {
  @Prop({ type: Object, required: true }) readonly galleryItem!: MediaGalleryItem
  @Prop({
    type: Function,
    required: true
  }) readonly selectClickHandler!: (item: MediaObject) => void
  @Prop({ type: Function, required: true }) readonly editClickHandler!: (item: MediaObject) => void
  @Inject() readonly selectionEnabled !: boolean
  @mediaObjectModule.Action('fetchAll') fetchMediaObjects !: (options?: { [propertyPath: string]: string | number }) => MediaObject[]
  @mediaObjectModule.Getter('list') mediaObjects !: MediaObject[]

  loadObjects () {
    if (this.galleryItem !== null) {
      this.fetchMediaObjects({
        mediaGalleryItems: this.galleryItem['@id']
      })
    }
  }

  mounted () {
    this.loadObjects()
  }

  @Watch('galleryItem')
  onGalleryItemChange (galleryItem: MediaGalleryItem | null) {
    this.loadObjects()
  }
}
</script>

<style scoped>

</style>
