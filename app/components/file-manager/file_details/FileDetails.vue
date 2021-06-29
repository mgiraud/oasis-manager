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
          ref="updateForm"
          :tree="tree"
          :values="item"
          :errors="state.violations"
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
import { computed, defineComponent, inject, Ref, ref, useContext, useFetch, watch } from '@nuxtjs/composition-api'
import { Validation } from '@vuelidate/core'
import FileDetailsForm from './FileDetailsForm.vue'
import { mediaNodeStore } from '~/custom-store/MediaNodeStore'
import { mediaObjectStore, MediaObject } from '~/custom-store/MediaObjectStore'
import { notificationStore } from '~/custom-store/NotificationStore'
import Toolbar from '~/components/form/Toolbar.vue'

export default defineComponent({
  components: {
    Toolbar,
    FileDetailsForm
  },
  props: {
    mediaObject: {
      type: Object as () => MediaObject,
      required: true
    }
  },
  setup (props) {
    const context = useContext()
    mediaNodeStore.setContext(context)
    mediaObjectStore.setContext(context)
    const closeDetailPanel = inject('closeDetailPanel')
    const item = computed(() => props.mediaObject)
    const updateForm = ref(null) as Ref<Element & Validation | null>

    useFetch(async () => {
      if (mediaNodeStore.tree.value.length === 0) {
        await mediaNodeStore.fetchTree()
      }
    })

    const onSendForm = () => {
      if (!updateForm.value) {
        return
      }
      updateForm.value.v$.$touch()

      if (!updateForm.value.v$.$invalid) {
        mediaObjectStore.update(item.value)
      }
    }

    watch(() => mediaObjectStore.getState().updated, (created: MediaObject | null) => {
      if (!created) {
        return
      }
      notificationStore.showMessage('Fichier mis à jour')
    })

    return {
      item,
      state: mediaObjectStore.getState(),
      tree: mediaNodeStore.tree,
      closeDetailPanel,
      updateForm,
      onSendForm
    }
  }
})
</script>
