<template>
  <div class="flex flex-col">
    <div class="flex-auto">
        <h3>Fichiers sélectionnés</h3>
    </div>
    <div class="flex-auto" v-if="thumbnails.length + links.length === 0">
      <p>
        Tu peux téleverser un fichier ou utiliser le navigateur pour sélectionner les fichiers à
        insérer
      </p>
    </div>
    <div class="flex flex-auto"
      v-else
    >
        <div class="flex flex-col">
          <div class="flex flex-auto">
            <div class="self-center flex-auto"
              v-for="(thumbnail, i) in thumbnails"
              :key="i"
            >
              <div>
                <img :src="thumbnail.src" class="max-h-52" />
                <div>
                  <button
                    class="btn-remove-thumbnail bg-error h-6 w-16 rounded-lg"
                    @click="removeThumbnail(i)"
                  >
                    <Icon icon="ri-close-line" class="h-6 w-6"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-auto">
            <div class="flex-auto"
              v-for="(link, i) in links"
              :key="i"
            >
              <span>{{ link.name }}
                <button
                  class="btn-remove-thumbnail bg-error h-6 w-16 rounded-lg"
                  @click="removeLink(i)"
                >
                  <Icon icon="ri-close-line" class="h-6 w-6"/>
                </button>
              </span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { MediaObject } from '~/store/media-object'
import Icon from '~/components/util/Icon.vue'

interface FileSelectionProps {
  thumbnails: Array<MediaObject>,
  links: Array<MediaObject>,
  removeThumbnail: Function,
  removeLink: Function
}

const props = defineProps<FileSelectionProps>()
</script>
