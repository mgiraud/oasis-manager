<template>
  <div class="flex flex-auto justify-center items-center bg-white">
    <Title>Connexion</Title>
    <div class="w-fit">
      <h2 class="py-3">Connexion</h2>
      <Form
        ref="form"
        v-slot="{ values, errors }"
        @submit="onSubmit"
        class="flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500"
        :validation-schema="schema"
      >
        <div class="flex flex-row w-full group py-4 px-3">
          <Icon icon="ri-mail-line"
                class="h-8 w-10 group-focus-within:stroke-2"
                :class="{'fill-accent': !!errors.email, 'fill-primary': !!values.email && !errors.email, 'fill-gray-500': !values.email}"
          />
          <div class="relative w-full">
            <Field id="email" name="email" type="email" required autocomplete="off" class="peer w-full outline-none h-8 autofill:bg-transparent" :validateOnInput="true"/>
            <label for="email"
                   :class="{'h-1/2 -translate-y-full pl-0': !!values.email, 'text-accent': !!errors.email, 'text-primary': !!values.email && !errors.email}"
                   class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">Email</label>
            <div
              :class="{'border-accent': !!errors.email, 'border-primary': !!values.email && !errors.email, 'border-gray-500': !values.email}"
              class="absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b "
            ></div>
          </div>
        </div>
        <div class="flex flex-row w-full group py-4 px-3">
          <Icon icon="ri-key-fill"
                class="h-8 w-10 group-focus-within:stroke-2"
                :class="{'fill-accent': !!errors.password, 'fill-primary': !!values.password && !errors.password, 'fill-gray-500': !values.password}"
          />
          <div class="relative w-full">
            <Field id="password" name="password" type="password" required autocomplete="off" class="peer w-full outline-none h-8" :validateOnInput="true"/>
            <label for="password"
                   :class="{'h-1/2 -translate-y-full pl-0': !!values.password, 'text-accent': !!errors.password, 'text-primary': !!values.password && !errors.password}"
                   class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">Password</label>
            <div
              :class="{'border-accent': !!errors.password, 'border-primary': !!values.password && !errors.password, 'border-gray-500': !values.password}"
              class="absolute bottom-0 -ml-8 w-[calc(100%_+_2rem)] border-b "
            ></div>
          </div>
        </div>
        <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Connexion</button>
        <button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent">Réinitialiser</button>
      </Form>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { Credentials, useAuthStore } from '~/store/auth'
import { Form, Field } from 'vee-validate';
import Icon from '~/components/util/Icon.vue'

const route = useRoute();
const store = useAuthStore()
const form = ref(null);

onMounted(() => {
  form.value && form.value.resetForm()
})

const schema = {
  email: 'required|email',
  password: 'required|min:10'
};

const onSubmit = async (credentials: Credentials) => {
  await store.login(credentials)
  if (!store.credentialError) {
    navigateTo('/')
  }
}

if (store.isLogged) {
  navigateTo('/')
}

</script>
