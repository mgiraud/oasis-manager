<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <PageModel v-if="page" :page="page" />
          <v-card-text v-else>
            Tu peux retrouver sur ce site toutes les informations relatives au projet de création d'un habitat partagé
          </v-card-text>
          <v-container fluid>
            <v-row v-for="article in articles" :key="article['@id']">
              <v-col>
                <blog-article-template :article="article" /></blog-article>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import PageModel from '~/components/page/PageModel.vue'
import { BlogArticle } from '~/store/blog_article'
import { Page } from '~/store/page'
import BlogArticleTemplate from '~/components/blog_article/BlogArticleTemplate.vue'

const securityModule = namespace('security')
const pageModule = namespace('page')
const blogArticleModule = namespace('blog_article')

@Component({
  components: {
    PageModel,
    BlogArticleTemplate
  }
})
export default class IndexVue extends Vue {
  @securityModule.Action('logout') logout!: () => void
  @pageModule.Getter('find') find!: (url: string) => Page | null
  @blogArticleModule.Action('fetchAll') fetchAll !: () => BlogArticle[]
  @blogArticleModule.Getter('list') articles !: BlogArticle[]

  public head () {
    return {
      title: 'Accueil'
    }
  }

  get page (): Page | null {
    return this.find('/api/pages/home')
  };

  mounted () {
    this.fetchAll()
  }
}
</script>
