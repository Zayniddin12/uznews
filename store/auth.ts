import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import {
  IAuthLogin,
  IAuthLoginResponse,
  IAuthRegister,
  IAuthRegisterResponse,
  IOauthPayload,
  IOauthResponse,
} from '~/types/auth'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    showLoginModal: false,
    auth: {
      loggedIn: false,
      user: null,
    },
  }),
  actions: {
    async fetchMe(token: string) {
      const { $get } = useApi()
      try {
        const data = await $get('users/UserProfile/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.auth.loggedIn = true
        this.auth.user = data
        return data
      } catch (error: any) {
        throw new Error(error)
      }
    },
    userLogin(body: IAuthLogin) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('users/SignIn/', { body })
          .then((res) => {
            console.log(res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    loginWithFacebook(data: IOauthPayload) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('users/FacebookLogin/', {
            body: {
              ...data,
            },
          })
          .then((res) => {
            const token = useCookie('token')
            token.value = res?.access_token
            this.auth.user = res?.user
            this.auth.loggedIn = true
            this.showLoginModal = false
            resolve(data)
          })
          .catch((error) => reject(error))
          .finally(() => {
            this.showLoginModal = false
          })
      })
    },
    loginViaGoogle(body: any) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('users/GoogleLogin/', {
            body,
          })
          .then((res) => {
            const token = useCookie('token')
            token.value = res?.access_token
            this.auth.user = res?.user
            this.auth.loggedIn = true
            this.showLoginModal = false
            resolve(res)
          })
          .catch((error) => reject(error))
          .finally(() => {
            this.showLoginModal = false
          })
      })
    },
    Logout() {
      try {
        // eslint-disable-next-line camelcase
        const access_token = useCookie('access_token')
        // eslint-disable-next-line camelcase
        const refresh_token = useCookie('refresh_token')
        // eslint-disable-next-line camelcase
        access_token.value = null
        // eslint-disable-next-line camelcase
        refresh_token.value = null
      } catch (error: any) {
        throw new Error(error)
      }
    },
    userRegister(body: IAuthRegister) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IAuthRegisterResponse>('users/SignUp/', { body })
          .then((data: IAuthRegisterResponse) => {
            resolve(data)
          })
      })
    },
    showLoginModalAction() {
      this.showLoginModal = true
    },
    showRegisterModalClose() {
      this.showLoginModal = false
    },
  },
  getters: {},
})
