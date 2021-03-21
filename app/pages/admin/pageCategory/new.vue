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
import Form from '~/components/admin/pageCategory/Form'
import Toolbar from '~/components/form/Toolbar'
import Loading from '~/components/util/Loading'
import create from '~/mixins/create'
import { PageCategory } from '~/store/page_category'
import NotificationMixin from '~/mixins/notification'
import { ElementWithValidation } from '~/types'

const pageCategoryModule = namespace('page_category')

@Component({
  components: {
    Form, Toolbar, Loading
  },
  middleware: 'hasPermissions',
  meta: {
    permissions: ['USER_CAN_EDIT_PAGE_CATEGORIES']
  }
})
export default class AdminPageCategoryNew extends mixins(create, validationMixin, NotificationMixin) {
  item = { content: null }

  @pageCategoryModule.State('created') created!: PageCategory | null
  @pageCategoryModule.State('error') error!: string | null
  @pageCategoryModule.State('isLoading') isLoading!: boolean
  @pageCategoryModule.State('violations') violations!: string[]

  @pageCategoryModule.Action('create') create!: (pageCategory: PageCategory) => PageCategory
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
      name: 'admin-pageCategory-id',
      params: { id: item['@id'].replace('/api/page_categories/', '') }
    })
  }

  @Watch('error')
  onError (message: string) {
    message && this.showError(message)
  }
}
</script>
