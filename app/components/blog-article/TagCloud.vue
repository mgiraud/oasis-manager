<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-chip-group
          active-class="darken-3"
          column
        >
          <v-chip
            v-if="state.tags.length > 0"
            :to="{name: 'blog'}"
            color="primary"
            exact
          >
            <v-icon>ri-home-2-line</v-icon>
          </v-chip>
          <v-chip
            v-for="tag in state.tags"
            :key="tag"
            :to="{name: 'blog-tag', params: {tag}}"
            color="primary"
            exact
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch } from '@nuxtjs/composition-api'
import { blogArticleStore } from '~/custom-store/BlogArticleStore'

export default defineComponent({
  setup () {
    blogArticleStore.setContext(useContext())

    useFetch(async () => {
      await blogArticleStore.fetchTags()
    })

    return {
      state: blogArticleStore.getState()
    }
  }
})

</script>
