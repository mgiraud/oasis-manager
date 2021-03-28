<template>
  <v-card class="fill-height ma-md-10" elevation="5">
    <v-container fluid>
      <v-row>
        <v-col>
          <Template v-if="page" :page="page" />
          <Error404 v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Template from '~/components/page/Template.vue'
import Error404 from '~/components/error/404.vue'
import { Page } from '~/store/page'

const pageModule = namespace('page')

@Component({
  components: {
    Template,
    Error404
  }
})
export default class BackUpVue extends Vue {
  @pageModule.Getter('find') find!: (url: string) => Page | null

  get page () {
    if (this.url !== null) {
      return this.find('/api/pages/' + decodeURIComponent(this.url))
    }
  };

  get url () {
    return this.$route.params ? this.$route.params.pathMatch : null
  }
}
</script>
