<template>
  <div class="flex flex-col bg-secondary-light min-h-screen text-sm order-first">
    <Body class="bg-primary" />
    <header class="fixed top-0 left-0 right-0 block z-40 bg-primary">
      <div class="bg-primary hidden md:block absolute top-0 left-0 w-full transition-all duration-200" :class="{ 'h-10': scrollY >= 50, 'h-36': scrollY < 50}">
        <div class="h-full bg-[url('/images/vercors.jpg')] bg-center bg-cover bg-no-repeat" :class="{'opacity-0': scrollY >= 50}"></div>
      </div>
      <div class="flex items-start transition-all duration-200" :class="{ 'h-10': scrollY >= 50, 'h-10 md:h-36': scrollY < 50}">
        <div @click="redirectToHome" class="self-end z-40 font-marker text-lg text-white px-4 py-2 cursor-pointer">Les transalpins</div>
        <div class="grow"></div>
        <div v-if="isAdmin" class="items-center text-primary-dark z-40  mr-1 inline-flex whitespace-nowrap uppercase tracking-wider text-sm py-2 h-10 cursor-pointer" @click="redirectToAdmin">ADMIN</div>
        <div class="h-10 inline-flex items-center pt-1 pb-2">
          <Icon icon="ri-login-box-line" v-if="!isLogged" @click="redirectToLogin" class="h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"/>
          <Icon icon="ri-logout-box-line" v-if="isLogged" @click="logout" class="h-5 w-5 z-40 fill-primary-dark mr-1 cursor-pointer"/>
        </div>
      </div>
      <div class="flex flex-row bg-info flex-wrap">
        <LayoutDefaultMenu />
      </div>
      <div class="bg-white">
        <div class="shadow-md flex flex-row justify-center items-center flex-auto flex-wrap">
          <Form
            v-slot="{ values, errors }"
            @submit="submitNewsletter"
            class="flex flex-row"
            :validation-schema="schema"
          >
            <TextField icon="ri-mail-line" type="email" name="email" :error="errors.email" :value="values.email" label="Email" class="w-96 py-4 px-3"/>
            <button :type="!errors.email && !!values.email ? 'submit': 'button'">
              <Icon icon="ri-send-plane-fill" class="h-5 w-5" :class="{'fill-primary hover:fill-primary-dark': !errors.email && !!values.email, 'fill-gray-500': !values.email, 'fill-accent': !!errors.email}"/>
            </button>
          </Form>
          <div class="mx-3 text-gray-800 text-sm">ET</div>
          <div class="grow md:grow-0">
            <button @click="redirectToHelloAsso" class="bg-primary hover:bg-primary-dark text-white text-sm px-3 py-1.5 shadow-md rounded-sm">
              <span class="uppercase tracking-wider font-light">Adhère à l'association</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="flex flex-col pt-48 sm:pt-64 flex-auto shadow-md mb-4">
      <slot />
    </div>
    <Footer />
    <Notification />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-4xl font-marker text-primary-dark;
  }
  h2 {
    @apply text-3xl font-marker text-primary;
  }
  h3 {
    @apply text-2xl font-marker text-primary-dark;
  }
}
</style>

<script setup lang="ts">
  import { onMounted, onUnmounted } from '@vue/runtime-core'
  import { storeToRefs } from 'pinia'
  import TextField from '~/components/form/TextField.vue'
  import Footer from '~/components/layout/default/Footer.vue'
  import { useAuthStore } from '~/store/auth'
  import { useContactNewsletterStore } from '~/store/contact-newsletter'
  import { CRUD_MODE } from '~/store/crud'
  import { useNotificationStore } from '~/store/notification'
  import { usePageStore } from '~/store/page'
  import LayoutDefaultMenu from '~/components/layout/default/Menu.vue'
  import Icon from '~/components/util/Icon.vue'
  import Notification from '~/components/layout/Notification.vue'
  import { Form, Field } from 'vee-validate';
  import Tooltip from '~/components/util/Tooltip.vue'

  const authStore = useAuthStore();
  const { isLogged, isAdmin } = storeToRefs(authStore)
  const pageStore = usePageStore();
  await useAsyncData('pages', () => {
    return pageStore.fetchAll()
  })

  const schema = {
    email: 'email',
  };

  const redirectToLogin = () => {
    navigateTo('/login')
  }

  const redirectToHome = () => {
    navigateTo('/')
  }

  const redirectToAdmin = () => {
    navigateTo('/admin')
  }

  const logout = () => {
    authStore.logout()
  }

  const newsletterStore = useContactNewsletterStore()
  const notificationStore = useNotificationStore()

  const submitNewsletter = async (data, actions) => {
    try {
      await newsletterStore.create(data)
      notificationStore.showMessage('Je suis maintenant inscris à la newsletter')
    } catch (e) {
      notificationStore.showError(newsletterStore[CRUD_MODE.CREATION].error)
      actions.setErrors(newsletterStore[CRUD_MODE.CREATION].violations)
    }
  }

  const scrollY = ref(0)

  function onScroll() {
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener("scroll", onScroll);
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  })

  function redirectToHelloAsso () {
    window.open('https://www.helloasso.com/associations/les-transalpins/adhesions/adhesion-2022', '_')
  }
</script>
