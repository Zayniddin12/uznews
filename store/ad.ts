import { defineStore } from 'pinia'

export interface IAD {
  id: number
  image: string
  link: string
}

export const useAd = defineStore('advertising', {
  state: () => ({
    ad: null as null | IAD,
  }),

  actions: {
    async fetchAdvertisement<T = unknown>(url: string) {
      try {
        const data = await useApi().$get<T<IAD>>(url)
        this.ad = data
        return data
      } catch (err) {
        throw err
      }
    },
  },

  getters: {
    getAd: (state) => {
      return state.ad
    },
  },
})
