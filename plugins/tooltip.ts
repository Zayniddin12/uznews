import { defineNuxtPlugin } from '#imports'
import { VTooltip } from '~/directives/tooltip'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', VTooltip)
})
