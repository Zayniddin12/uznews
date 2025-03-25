import { defineStore } from 'pinia'

import { ICurrency, IExchangeRate } from '~/types/currency'

export const useCurrencyStore = defineStore('currencyStore', {
  state: () => ({
    currency: {} as ICurrency,
    exchangeRate: {} as IExchangeRate,
  }),
  actions: {
    fetchCurrency() {
      return new Promise((resolve, reject) => {
        if (Object.keys(this.currency).length) {
          resolve(this.currency)
        } else {
          useApi()
            .$get(`common/Currency`, {})
            .then((res: ICurrency) => {
              this.currency = res
              resolve(res)
            })
            .catch((err) => reject(err))
        }
      })
    },
    fetchExchangeRate() {
      return new Promise((resolve, reject) => {
        if (Object.keys(this.exchangeRate).length) {
          resolve(this.exchangeRate)
        } else {
          useApi()
            .$get(`common/ExchangeRate`, {})
            .then((res: IExchangeRate) => {
              this.exchangeRate = res
              resolve(res)
            })
            .catch((err) => reject(err))
        }
      })
    },
  },
})
