<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>
          Détail du fichier
          <v-btn rounded right fixed small color="error" @click="closeDetailPanel">
            <v-icon>
              ri-close-line
            </v-icon>
          </v-btn>
        </h3>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <file-details-form :tree="tree" :values="item" ref="updateForm" :errors="violations"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Toolbar
            :handle-submit="onSendForm"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, InjectReactive, namespace, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { MediaObject } from "~/store/media_object";
import { MediaGallery } from "~/store/media_gallery";
import FileDetailsForm from './FileDetailsForm.vue'
import { Repository } from '~/api/repository'
import Toolbar from '~/components/form/Toolbar.vue'
import { ElementWithValidation } from '~/vue-shim'
import { Page } from '~/store/page'

const mediaGalleryModule = namespace('media_gallery')
const mediaObjectModule = namespace('media_object')

@Component({
  components: {
    Toolbar,
    FileDetailsForm
  }
})
export default class FileDetails extends Vue {
  @Prop({type: Object, required: true}) readonly mediaObject!: MediaObject
  @mediaGalleryModule.Getter('tree') readonly tree!: () => MediaGallery[]
  @mediaGalleryModule.Action('fetchTree') fetchTree !: (repository: Repository) => MediaGallery[]
  @mediaGalleryModule.State('treeIds') allTreeIds !: string[]
  @mediaObjectModule.Action('update') update!: (mediaObject: MediaObject) => Promise<MediaObject>
  @mediaObjectModule.State('violations') violations!: string[]
  @InjectReactive() readonly closeDetailPanel !: () => void
  item = {...this.mediaObject}

  @Watch('mediaObject')
  onRetrieved (val: MediaObject) {
    this.item = { ...val }
  }

  async mounted() {
    await this.fetchTree(this.$getRepository('media_galleries'))
  }

  onSendForm () {
    const updateForm = this.$refs.updateForm as ElementWithValidation
    updateForm.$v.$touch()

    if (!updateForm.$v.$invalid) {
      this.update(updateForm.$v.item.$model)
    }
  }
}
</script>