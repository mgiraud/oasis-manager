<template>
  <div class="flex bg-white flex-auto flex-col py-3">
    <PageComponent v-if="page" :page="page"  />
    <div v-else>
      <p>
        Pour nous contacter tu peux nous envoyer un email à <a
        href="mailto:contact@lestransalpins.org"
        title="Envoyer un email aux transalpins"
      >contact@lestransalpins.org</a> ou bien remplir le formulaire suivant.</p>
      <p>
        Dans ce cas tu recevras un email de confirmation ou bien regarde dans tes spams si
        ce n'est pas le cas.
      </p>
    </div>
    <Form
      v-slot="{ values, errors }"
      @submit="onSubmit"
      class="flex flex-row flex-wrap w-full sm:w-3/4 md:wd-1/2 lg:wd-1/3 justify-center self-center text-gray-500"
      :validation-schema="schema"
    >
      <div class="flex flex-row w-1/2 group py-4 px-3">
        <Icon icon="ri-mail-line"
              class="h-8 w-10 group-focus-within:stroke-2"
              :class="{'fill-accent': !!errors.email, 'fill-primary': !!values.email && !errors.email, 'fill-gray-500': !values.email}"
        />
        <div class="relative w-full">
          <Field id="email" name="email" type="email" required autocomplete="off" class="peer w-full outline-none h-8" :validateOnInput="true"/>
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

      <div class="flex flex-row w-1/2 group py-4 px-3">
        <div class="relative w-full">
          <Field id="phoneNumber" name="phoneNumber" autocomplete="off" type="tel" format="0[0-9]{9}" class="peer w-full outline-none h-8" :validateOnInput="true"/>
          <label for="phoneNumber"
                 :class="{'h-1/2 -translate-y-full pl-0': !!values.phoneNumber, 'text-accent': !!errors.phoneNumber, 'text-primary': !!values.phoneNumber && !errors.phoneNumber}"
                 class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">Numéro de téléphone</label>
          <div
            :class="{'border-accent': !!errors.phoneNumber, 'border-primary': !!values.phoneNumber && !errors.phoneNumber, 'border-gray-500': !values.phoneNumber}"
            class="absolute bottom-0 w-full border-b "
          ></div>
        </div>
      </div>

      <div class="flex flex-row w-1/2 group py-4 px-3">
        <div class="relative w-full">
          <Field id="firstName" name="firstName" autocomplete="off" type="text" format="0[0-9]{9}" class="peer w-full outline-none h-8" :validateOnInput="true"/>
          <label for="firstName"
                 :class="{'h-1/2 -translate-y-full pl-0': !!values.firstName, 'text-accent': !!errors.firstName, 'text-primary': !!values.firstName && !errors.firstName}"
                 class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">Prénom</label>
          <div
            :class="{'border-accent': !!errors.firstName, 'border-primary': !!values.firstName && !errors.firstName, 'border-gray-500': !values.firstName}"
            class="absolute bottom-0 w-full border-b "
          ></div>
        </div>
      </div>

      <div class="flex flex-row w-1/2 group py-4 px-3">
        <div class="relative w-full">
          <Field id="lastName" name="lastName" autocomplete="off" type="text" format="0[0-9]{9}" class="peer w-full outline-none h-8" :validateOnInput="true"/>
          <label for="lastName"
                 :class="{'h-1/2 -translate-y-full pl-0': !!values.lastName, 'text-accent': !!errors.lastName, 'text-primary': !!values.lastName && !errors.lastName}"
                 class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">Nom</label>
          <div
            :class="{'border-accent': !!errors.lastName, 'border-primary': !!values.lastName && !errors.lastName, 'border-gray-500': !values.lastName}"
            class="absolute bottom-0 w-full border-b "
          ></div>
        </div>
      </div>

      <div class="flex flex-row w-full group py-4 px-3">
        <div class="relative w-full">
          <Field id="subject" name="subject" autocomplete="off" type="text" format="0[0-9]{9}" class="peer w-full outline-none h-8" :validateOnInput="true"/>
          <label for="subject"
                 :class="{'h-1/2 -translate-y-full pl-0': !!values.subject, 'text-accent': !!errors.subject, 'text-primary': !!values.subject && !errors.subject}"
                 class="transform transition-all absolute top-0 left-0 h-full flex items-center pl-0 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full
          ">Sujet</label>
          <div
            :class="{'border-accent': !!errors.subject, 'border-primary': !!values.subject && !errors.subject, 'border-gray-500': !values.subject}"
            class="absolute bottom-0 w-full border-b "
          ></div>
        </div>
      </div>

      <div class="flex flex-col w-full group py-4 px-3">
        <div class="flex flex-row">
          <label for="content" class="w-fit self-center" :class="{'text-accent': !!errors.content, 'text-primary': !!values.content && !errors.content}">Message</label>
          <Tooltip v-if="errors.content">{{errors.content}}</Tooltip>
        </div>
        <Field as="textarea" autocomplete="off" rows="10" id="content" name="content" type="textarea" format="0[0-9]{9}"
               class="w-full w-full border p-2 outline-none"
               :class="{'border-accent': !!errors.content, 'border-primary': !!values.content && !errors.content, 'border-gray-500': !values.content}"/>
      </div>
      <button type="submit" class="py-3 px-4 bg-primary text-white shadow-md uppercase hover:bg-primary-dark">Envoyer</button>
      <button type="reset" class="py-3 px-4 bg-secondary text-white shadow-md uppercase hover:bg-accent">Réinitialiser</button>
    </Form>
  </div>
</template>

<script setup lang="ts">

import PageComponent from '~/components/front/PageComponent.vue'
import Tooltip from '~/components/util/Tooltip.vue'
import { useContactStore } from '~/store/contact'
import { CRUD_MODE } from '~/store/crud'
import { useNotificationStore } from '~/store/notification'
import { usePageStore } from '~/store/page'
import Icon from '~/components/util/Icon.vue'
import { Form, Field } from 'vee-validate';

const pageStore = usePageStore()
const page = pageStore.find('/api/pages/contact')
const contactStore = useContactStore()
const notificationStore = useNotificationStore()

const schema = {
  email: 'required|email',
  phoneNumber:'regex:^0\\d{9}$',
  firstName: 'min:3|max:60',
  lastName: 'min:3|max:60',
  subject: 'required|min:8|max:60',
  content: 'required|min:10|max:1000'
};

const onSubmit = async (data) => {
  try {
    await contactStore.create(data)
    notificationStore.showMessage('Message correctement envoyé !')
  } catch (e) {
    notificationStore.showError(contactStore[CRUD_MODE.CREATION].error)
  }
}

definePageMeta({
  title: 'Contacte-nous'
})
</script>
