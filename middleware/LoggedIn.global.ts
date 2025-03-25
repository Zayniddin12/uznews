import { useAuthStore } from '~/store/auth'

export default function () {
  const authStore = useAuthStore()
  const token = useCookie('token')
  if (token.value && !authStore.auth.loggedIn) {
    authStore.fetchMe(token.value).catch((err) => {
      console.log(err, 'loggedIn middleware')
    })
  }
}
