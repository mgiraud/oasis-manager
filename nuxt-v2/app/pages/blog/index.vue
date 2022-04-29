<template>
  <v-container fill-height>
    <v-row>
      <v-col>
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col offset-lg="4" lg="4">
                <tag-cloud />
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
import { defineComponent, useContext, useFetch, toRef } from '@nuxtjs/composition-api'
import BlogArticleTemplate from '../../components/blog-article/BlogArticleTemplate.vue'
import TagCloud from '../../components/blog-article/TagCloud.vue'
import { blogArticleStore } from '../../custom-store/BlogArticleStore'

export default defineComponent({
  components: {
    TagCloud,
    BlogArticleTemplate
  },
  setup () {
    blogArticleStore.setContext(useContext())

    useFetch(async () => {
      await blogArticleStore.fetchAll({ 'order[createdAt]': 'desc' })
    })

    return {
      articles: toRef(blogArticleStore.getState(), 'byId')
    }
  },
  head () {
    return {
      title: 'Blog'
    }
  }
})

</script>
