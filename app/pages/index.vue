<template>
  <div>
    <h1>COUCOU</h1>
    <FormKit
      label="I have a validation error"
      type="text"
      help="I must equal 'foo'"
      value="bar"
      validation="required|is:foo"
      validation-visibility="live"
      validation-label="Input"
    />
    <FormKit
      label="I am a disabled input"
      type="text"
      value="I'm so faded"
      help="I cannot be interacted with"
      :disabled="true"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const store = useAuthStore();
// const inputTypes = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'month', 'number', 'password', 'radio', 'range', 'search', 'select', 'submit', 'tel', 'text', 'textarea', 'time', 'url', 'week']
// const inputOptions = {
//   checkbox: ['I like Tailwind', 'I also like FormKit', 'I like other things too'],
//   radio: ['I like Tailwind', 'I like FormKit', 'I like everything'],
//   select: ['I like Tailwind', 'I like FormKit', 'I like everything'],
// }
</script>
