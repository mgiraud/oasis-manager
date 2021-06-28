<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="item.nickname"
            label="Pseudo"
            :error-messages="nicknameErrors"
            required
            @input="v$.nickname.$touch()"
            @blur="v$.nickname.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-if="groupSelectItems"
            v-model="item.groups"
            :items="groupSelectItems"
            label="Groupe"
            item-text="name"
            item-value="@id"
            clearable
            multiple
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-combobox
            v-if="permissions"
            v-model="item.memberPermissions"
            hide-selected
            :items="permissions"
            label="Permissions"
            clearable
            multiple
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-radio-group v-model="item.groupPermissionsOverrideType">
            <v-radio
              v-for="(label, index) in permissionOverride"
              :key="index"
              :label="label"
              :value="index"
            />
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import has from 'lodash/has'
import { FormErrors } from '~/api/repository'
import usePermissions from '~/composable/usePermissions'
import { memberGroupStore } from '~/store/MemberGroupStore'
import { Member } from '~/store/MemberStore'
import { securityStore } from '~/store/SecurityStore'

const permissionOverride = ['Fusionner les permissions', 'Permissions du groupe seulement', 'Permission du membre seulement']

export default defineComponent({
  props: {
    values: {
      type: Object as () => Member,
      required: true
    },
    errors: {
      type: Object as () => FormErrors,
      default: () => {}
    }
  },
  setup (props) {
    const item = computed(() => props.values)

    const validation = computed(() => ({
      nickname: {
        required,
        minLength: minLength(4)
      }
    }))

    const v$ = useVuelidate(validation, item)

    const violations = computed(() => props.errors)

    const nicknameErrors = computed(() => {
      const errors: string[] = []
      if (!v$.value.nickname || !v$.value.nickname.$dirty) {
        return errors
      }
      has(violations.value, 'nickname') && errors.push(violations.value.nickname)
      v$.value.nickname.minLength.$invalid && errors.push('Le titre doit faire au moins 4 caractères')
      return errors
    })

    onMounted(() => {
      memberGroupStore.fetchAll()
    })

    usePermissions()

    return {
      item,
      v$,
      nicknameErrors,
      state: securityStore.getState(),
      permissionOverride,
      permissions: securityStore.getState().permissions,
      groupSelectItems: memberGroupStore.list
    }
  }
})
</script>
