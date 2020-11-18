<template>
  <v-container>
    <v-row>
      <AdminPageForm :values="item" />
    </v-row>
    <v-row>
      <v-col>
        <FormToolbar
          :handle-edit="update"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  async validate () {

  },
  async fetch () {
    const page = await this.getPageByUrl(this.$route.params.slug)
    this.item = { ...page }
  },
  data () {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters('page', ['getPageByUrl'])
  },
  methods: {
    update () {
    }
  }
}
</script>
