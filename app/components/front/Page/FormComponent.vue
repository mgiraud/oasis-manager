<template>
  <FormKit
    type="form"
    v-model="page"
  >
    <FormKit
      name="title"
      type="text"
      label="Title"
      validation="required"
    />
    <FormKit
      name="url"
      type="text"
      label="Url"
      validation="required"
    />
    <FormKit
      name="isPublished"
      type="checkbox"
      label="Publier"
    />
    <FormKit
      name="showInMenu"
      type="checkbox"
      label="Afficher dans le menu"
    />

    <ClientOnly>
      <Editor
        v-if="page.content !== undefined"
        ref="editor"
        v-model="page.content"
      >
      </Editor>
    </ClientOnly>
    {{page}}
  </FormKit>
</template>

<script setup lang="ts">
import { Page } from '~/store/page'
import Editor from '~/components/util/Editor'

const props = defineProps<{page: Page}>()
</script>
