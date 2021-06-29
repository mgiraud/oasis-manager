<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <PageModel
            v-if="page"
            :page="page"
          />
          <v-card-text v-else>
            Tu peux retrouver sur ce site toutes les informations relatives au projet de création
            d'un habitat partagé
          </v-card-text>
          <v-container fluid>
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
import {
  defineComponent,
  useFetch,
  useContext, ref, Ref
} from '@nuxtjs/composition-api'
import { HydraMemberObject } from '~/api/hydra'
import PageModel from '~/components/page/PageModel.vue'
import BlogArticleTemplate from '~/components/blog-article/BlogArticleTemplate.vue'
import { pageStore } from '~/custom-store/PageStore'
import { blogArticleStore } from '~/custom-store/BlogArticleStore'

export default defineComponent({
  components: {
    PageModel,
    BlogArticleTemplate
  },
  setup () {
    const context = useContext()
    pageStore.setContext(context)
    blogArticleStore.setContext(context)
    const articles = ref([]) as Ref<HydraMemberObject[]>

    useFetch(async () => {
      await blogArticleStore.fetchAll({ 'order[createdAt]': 'desc' })
      articles.value = blogArticleStore.list.value
    })

    return {
      articles,
      page: pageStore.find('/api/pages/home')
    }
  },
  head () {
    return {
      title: 'Accueil'
    }
  }
})
</script>
