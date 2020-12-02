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
            @input="$v.item.nickname.$touch()"
            @blur="$v.item.nickname.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-if="groupsSelectItems"
            v-model="item.groups"
            :items="groupsSelectItems"
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

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import has from 'lodash/has'
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'

export default {
  name: 'AdminPageForm',
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
      default: () => {}
    },
    errors: {
      type: Object,
      default: () => {}
    },
    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    permissionOverride: ['Fusionner les permissions', 'Permissions du groupe seulement', 'Permission du membre seulement']
  }),
  computed: {
    ...mapState('security', ['permissions']),
    ...mapFields('member_group', {
      groupsSelectItems: 'selectItems'
    }),
    item () {
      return this.initialValues || this.values
    },
    nicknameErrors () {
      const errors = []
      if (!this.$v.item.nickname.$dirty) { return errors }
      has(this.violations, 'nickname') && errors.push(this.violations.nickname)
      !this.$v.item.nickname.minLength && errors.push('Le pseudo doit faire au moins 4 caractères')
      return errors
    },
    violations () {
      return this.errors || {}
    }
  },
  mounted () {
    this.groupsGetSelectItems()
  },
  methods: {
    ...mapActions('member_group', {
      groupsGetSelectItems: 'fetchSelectItems'
    })
  },
  validations: {
    item: {
      nickname: {
        required,
        minLength: minLength(4)
      }
    }
  }
}
</script>
