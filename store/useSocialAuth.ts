import { RouteLocation } from 'vue-router'
import { googleTokenLogin } from 'vue3-google-login'

import { useAuthStore } from '~/store/auth'
import { ESocialAuth, ILoginViaGoogleData, IOauthPayload } from '~/types/auth'
import { generateUniqueId } from '~/utils'

const CONFIG = {
  GoogleKey: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  FacebookKey: import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID,
}

export default function useSocialAuth() {
  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  // function setTokens(data: IOauthResponse) {
  //     const query = { ...route.query };
  //     if (data.access) {
  //         JwtService.setAccessToken(data);
  //         JwtService.setRefreshToken(data?.refresh);
  //         JwtService.removeUserUUID();
  //     } else {
  //         JwtService.setUserUUID(data["user-uuid"] as string);
  //         query.verifySocialAuth = String(true);
  //     }
  //     router.push({ name: "Home", query });
  // }
  const loginWithGoogle = async () => {
    const token = await googleTokenLogin({ clientId: CONFIG.GoogleKey })
    console.log(token, 'token')
    const data: ILoginViaGoogleData = {
      access_token: token.access_token,
      device_id: generateUniqueId(),
    }

    authStore
      .loginViaGoogle(data)
      .then((data) => {
        console.log('google auth: ', data)
        // setTokens(data)
      })
      .catch((error) => {
        console.log(error)
        // useHandler(error)
      })
  }

  function authFacebook(payload: IOauthPayload) {
    // const data = {
    //   access_token:
    //     'EAAv85M41dX0BOZBqXci9ri1h89LRNjA8RWYhVuPltfBPQhmzzp0Hs56ismApsml4wGJBnDQp7o2ZBZBUmVOskMc6FfgtdoJIZCAMWlUYCOYjBWVyxOvRQY6t2wfe5xsG0CgCXBbrJbFcKE9j4GhZA4L8mPgGezSlgRC7ljEQq96u6lhwsnqwCMUSWZAlqrZBcH8T7CQ9VZCbhjTSCKLJw0v6UK73A4GqxG66LxSkUBhoux3aERngvR0ocpe4JjpgmMMZD',
    // }
    authStore
      .loginWithFacebook(payload)
      .then((data) => {
        console.log('authFacebook: ', data)
        // setTokens(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function loginWithFacebook() {
    window.location.href = `https://www.facebook.com/v8.0/dialog/oauth?client_id=${CONFIG.FacebookKey}&redirect_uri=${window.location.href}`
  }

  async function authMiddleware(to: RouteLocation) {
    const provider = to?.params?.provider as ESocialAuth
    if (![ESocialAuth.GOOGLE, ESocialAuth.FACEBOOK].includes(provider)) {
      return
    }
    if (provider === ESocialAuth.FACEBOOK) {
      const code = to.query.code
      await authFacebook({ code })
    }
  }

  return {
    loginWithGoogle,
    authMiddleware,
    loginWithFacebook,
    authFacebook,
    CONFIG,
  }
}
