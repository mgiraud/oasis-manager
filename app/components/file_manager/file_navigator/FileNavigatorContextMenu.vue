<template>
  <v-card
    id="file-navigator-context-menu"
    class="context-menu"
    tile
  >
    <v-list dense>
      <v-list-item-group
        color="primary"
      >
        <v-dialog
          v-if="galleryItem"
          v-model="dialog"
          width="500"
        >
          <template #activator="{ on, attrs }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-icon>
                <v-icon>ri-folder-add-fill</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Nouveau dossier
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Ajouter un dossier
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="newFolderName"
                  label="Nom du dossier"
                  required
                />
              </v-form>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                @click="onFolderCreate"
              >
                Créer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, namespace, Prop } from 'nuxt-property-decorator'
import FileNavigator from './FileNavigator.vue'
import { MediaGalleryItem, MediaGalleryItemNew } from '~/store/media_gallery_item'

const mediaGalleryItemModule = namespace('media_gallery_item')

@Component
export default class FileNavigatorFolders extends Vue {
    @Prop({ type: Object, required: false }) readonly galleryItem!: MediaGalleryItem | null
    @mediaGalleryItemModule.Action('create') create!: (item: MediaGalleryItemNew) => Promise<MediaGalleryItem>

    contextMenu : HTMLElement | null = null
    dialog = false
    newFolderName: string | null = null

    showMenu (event: MouseEvent) {
      if (!this.contextMenu) {
        return
      }
      if ((this.contextMenu.offsetWidth + event.pageX) >= window.innerWidth) {
        this.contextMenu.style.left = (event.pageX - this.contextMenu.offsetWidth + 2) + 'px'
      } else {
        this.contextMenu.style.left = (event.pageX - 2) + 'px'
      }
      if ((this.contextMenu?.offsetHeight + event.pageY) >= window.innerHeight) {
        this.contextMenu.style.top = (event.pageY - this.contextMenu?.offsetHeight + 2) + 'px'
      } else {
        this.contextMenu.style.top = (event.pageY - 2) + 'px'
      }
      this.contextMenu.classList.add('context-menu--active')
    }

    hideMenu () {
      if (!this.contextMenu) {
        return
      }

      this.contextMenu.style.left = '0px'
      this.contextMenu.style.top = '0px'
      this.contextMenu.classList.remove('context-menu--active')
    }

    onClick (e: MouseEvent | TouchEvent) {
      if (!e.target || !this.contextMenu) {
        return
      }
      if (!this.contextMenu.contains(e.target as Node)) {
        this.hideMenu()
      }
    }

    mounted () {
      this.contextMenu = document.getElementById('file-navigator-context-menu') as HTMLElement
      document.addEventListener(document.ontouchstart !== null ? 'click' : 'touchstart', this.onClick, false)
    }

    async onFolderCreate () {
      this.dialog = false
      if (!this.newFolderName || !this.galleryItem) {
        return
      }
      await this.create({
        name: this.newFolderName,
        parent: this.galleryItem['@id']
      })
      const parent = this.$parent as FileNavigator
      await parent.refresh()
    }
}
</script>

<style scoped lang="scss">
.context-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  position: fixed;
  z-index: 1000000;

  &--active {
    display: block;
  }
}
</style>
