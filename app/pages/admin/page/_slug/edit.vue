<template>
  <v-container>
    <v-row>
      <v-col>
        <FormToolbar :handle-edit="update" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters('page', ['getPageByUrl']),
    page () {
      return this.getPageByUrl(this.route.params.slug)
    }
  },
  methods: {
    update () {
    }
  }
}
</script>
