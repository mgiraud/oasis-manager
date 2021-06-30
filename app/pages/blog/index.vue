<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col class="text-center">
                <h2 class="primary--text">Blog</h2>
              </v-col>
            </v-row>
            <v-row
              v-for="article in articles"
              :key="article['@id']"
            >
              <v-col>
                <blog-article-template :article="article" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import BlogArticleTemplate from '~/components/blog-article/BlogArticleTemplate.vue'
import { blogArticleStore } from '~/custom-store/BlogArticleStore'

export default defineComponent({
  components: {
    BlogArticleTemplate
  },
  setup () {
    blogArticleStore.setContext(useContext())

    const articles = computed(() => {
      return blogArticleStore.list.value
    })

    onMounted(async () => {
      await blogArticleStore.fetchAll({ 'order[createdAt]': 'desc' })
    })

    return {
      articles
    }
  },
  head () {
    return {
      title: 'Blog'
    }
  }
})

</script>
