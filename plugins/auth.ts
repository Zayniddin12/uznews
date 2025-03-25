import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const accessToken: any = useCookie('token')
    const authStore = useAuthStore(nuxtApp.$pinia)
    if (accessToken.value) {
      await authStore.fetchMe(accessToken)
    }
  } catch (e) {
    console.error(e)
    // return e;
  }
})
