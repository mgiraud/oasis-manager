<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>
          Détail du fichier
          <v-btn
            rounded
            right
            fixed
            small
            color="error"
            @click="closeDetailPanel"
          >
            <v-icon>
              ri-close-line
            </v-icon>
          </v-btn>
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <file-details-form
          :tree="tree"
          :values="item"
          ref="updateForm"
          :errors="violations"
        />
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
import FileDetailsForm from './FileDetailsForm.vue'
import { MediaObject } from '~/store/media_object'
import { Repository } from '~/api/repository'
import Toolbar from '~/components/form/Toolbar.vue'
import { ElementWithValidation } from '~/vue-shim'
import { MediaNode } from '~/store/media_node'

const mediaNodeModule = namespace('media_node')
const mediaObjectModule = namespace('media_object')

@Component({
  components: {
    Toolbar,
    FileDetailsForm
  }
})
export default class FileDetails extends Vue {
  @Prop({ type: Object, required: true }) readonly mediaObject!: MediaObject
  @mediaNodeModule.Getter('tree') readonly tree!: () => MediaNode[]
  @mediaNodeModule.Action('fetchTree') fetchTree !: (repository: Repository) => MediaNode[]
  @mediaNodeModule.State('treeIds') allTreeIds !: string[]
  @mediaObjectModule.Action('update') update!: (mediaObject: MediaObject) => Promise<MediaObject>
  @mediaObjectModule.State('violations') violations!: string[]
  @InjectReactive() readonly closeDetailPanel !: () => void
  item = { ...this.mediaObject }

  @Watch('mediaObject')
  onRetrieved (val: MediaObject) {
    this.item = { ...val }
  }

  async fetch () {
    if (this.tree.length === 0) {
      await this.fetchTree(this.$getRepository('media_nodes'))
    }
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
