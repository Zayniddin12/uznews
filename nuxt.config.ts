// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://uznews.uz' },
      ],
      title: 'UzNews.uz - Новости Узбекистана',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/ogru.png',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'Open Graph Image',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'UzNews.uz - Новости Узбекистана',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Новости Узбекистана. Последние события за сегодня, происшествия, новости политики и экономики. Репортажи, аналитика, прогнозы, мнение экспертов.',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: '/ogru.png',
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: 'Twitter Image',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'UzNews.uz - Новости Узбекистана',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            'Новости Узбекистана. Последние события за сегодня, происшествия, новости политики и экономики. Репортажи, аналитика, прогнозы, мнение экспертов.',
        },
        {
          name: 'description',
          content:
            'Новости Узбекистана. Последние события за сегодня, происшествия, новости политики и экономики. Репортажи, аналитика, прогнозы, мнение экспертов.',
        },
      ],
    },
  },

  css: ['~/assets/style.css', '~/assets/icomoon/style.css'],

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
  ],
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],

  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },

  devtools: {
    enabled: true,
  },
})
