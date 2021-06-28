<template>
  <v-card
    id="fileNavigatorContextMenu"
    class="context-menu"
    tile
  >
    <v-list dense>
      <v-list-item-group
        color="primary"
      >
        <v-dialog
          v-if="mediaNode"
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
import { defineComponent, onMounted, Ref, ref, useContext } from '@nuxtjs/composition-api'
import { mediaNodeStore } from '~/custom-store/MediaNodeStore'

export default defineComponent({
  props: {
    mediaNode: {
      type: Object,
      default: null
    },
    refresh: {
      type: Function as () => {},
      required: true
    }
  },
  setup (props) {
    const context = useContext()
    const contextMenu: Ref<HTMLElement | null> = ref(null)
    const dialog = ref(false)
    const newFolderName = ref(null) as Ref<null | string>
    mediaNodeStore.setContext(context)

    onMounted(() => {
      contextMenu.value = document.getElementById('fileNavigatorContextMenu') as HTMLElement
      document.addEventListener(document.ontouchstart !== null ? 'click' : 'touchstart', onClick, false)
    })

    const showMenu = (event: MouseEvent) => {
      if (!contextMenu.value) {
        return
      }
      if ((contextMenu.value.offsetWidth + event.pageX) >= window.innerWidth) {
        contextMenu.value.style.left = (event.pageX - contextMenu.value.offsetWidth + 2) + 'px'
      } else {
        contextMenu.value.style.left = (event.pageX - 2) + 'px'
      }
      if ((contextMenu.value.offsetHeight + event.pageY) >= window.innerHeight) {
        contextMenu.value.style.top = (event.pageY - contextMenu.value.offsetHeight + 2) + 'px'
      } else {
        contextMenu.value.style.top = (event.pageY - 2) + 'px'
      }
      contextMenu.value.classList.add('context-menu--active')
    }

    const hideMenu = () => {
      if (!contextMenu.value) {
        return
      }

      contextMenu.value.style.left = '0px'
      contextMenu.value.style.top = '0px'
      contextMenu.value.classList.remove('context-menu--active')
    }

    const onClick = (e: MouseEvent | TouchEvent) => {
      if (!e.target || !contextMenu.value) {
        return
      }
      if (!contextMenu.value.contains(e.target as Node)) {
        hideMenu()
      }
    }

    const onFolderCreate = async () => {
      dialog.value = false
      if (!newFolderName || !props.mediaNode) {
        return
      }
      await mediaNodeStore.create({
        name: newFolderName.value,
        parent: props.mediaNode['@id']
      })
      await props.refresh()
    }

    return {
      newFolderName,
      dialog,
      onFolderCreate,
      showMenu
    }
  }
})
</script>

<style
  scoped
  lang="scss"
>
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
