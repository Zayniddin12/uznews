import VueRecaptcha from 'vue3-recaptcha-v2'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueRecaptcha, {
    siteKey: import.meta.env.VITE_APP_RECAPTCHA_KEY as string,
  })
})
