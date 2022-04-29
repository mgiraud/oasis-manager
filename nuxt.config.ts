import FormKitPlugin from '@formkit/tailwindcss'
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'app/',
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'https://127.0.0.1:8000/api'
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@formkit/nuxt'],
  formkit: {
    configFile: './app/config/formkit.config',
  },
  tailwindcss: {
    config: {
      content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/config/**/*.ts",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
      ],
      plugins: [
        FormKitPlugin
      ],
    },
  },
  typescript: {
    strict: true
  },
})
