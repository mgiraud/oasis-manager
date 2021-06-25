<template>
  <div>
    <Form ref="createForm" :values="item" :errors="violations" />
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script lang="ts">
import { Component, mixins, namespace, Watch } from 'nuxt-property-decorator'
import { validationMixin } from 'vuelidate'
import Form from '~/components/admin/pageCategory/Form.vue'
import Toolbar from '~/components/form/Toolbar.vue'
import Loading from '~/components/util/Loading.vue'
import { PageCategory } from '~/store/page_category'
import NotificationMixin from '~/mixins/notification'
import { ElementWithValidation } from '~/vue-shim'
import CreateMixin from '~/mixins/create'

const pageCategoryModule = namespace('page_category')

@Component({
  components: {
    Form, Toolbar, Loading
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGE_CATEGORIES']
  },
  mixins: [CreateMixin, validationMixin]
})
export default class AdminPageCategoryNew extends mixins(NotificationMixin) {
  item = { content: null }

  @pageCategoryModule.State('created') created!: PageCategory | null
  @pageCategoryModule.State('error') error!: string | null
  @pageCategoryModule.State('isLoading') isLoading!: boolean
  @pageCategoryModule.State('violations') violations!: string[]

  @pageCategoryModule.Action('create') create!: (pageCategory: PageCategory) => Promise<PageCategory>
  @pageCategoryModule.Action('reset') reset!: () => void

  onSendForm () {
    const createForm = this.$refs.createForm as ElementWithValidation
    createForm.$v.$touch()
    if (!createForm.$v.$invalid) {
      this.create(createForm.$v.item.$model)
    }
  }

  resetForm () {
    const createForm = this.$refs.createForm as ElementWithValidation
    createForm.$v.$reset()
    this.item = { content: null }
  }

  @Watch('created')
  onCreated (item: PageCategory | null) {
    if (!item) {
      return
    }

    this.showMessage(`La catégorie "${item.name}" a bien été crée`)

    this.$router.push({
      name: 'admin-page-category-id',
      params: { id: item['@id'].replace('/api/page_categories/', '') }
    })
  }

  @Watch('error')
  onError (message: string) {
    message && this.showError(message)
  }
}
</script>
