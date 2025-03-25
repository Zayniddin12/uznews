import VueReCaptcha from 'vue3-recaptcha-v2'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_APP_RECAPTCHA_KEY,
  })
})
