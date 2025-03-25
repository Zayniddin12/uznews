import { defineStore } from 'pinia'

import { IContactApplication } from '~/types/contact'

interface State {
  contact: IContactApplication[]
}

export const useContactStore = defineStore('contactStore', {
  state: (): State => ({
    contact: [],
  }),
  actions: {
    fetchContact() {
      return new Promise((resolve, reject) => {
        if (this.contact.length > 0) {
          resolve(this.contact)
        } else {
          useApi()
            .$get('common/ContactList')
            .then((data: any) => {
              this.contact = data.results
              resolve(data)
            })
            .catch((err) => {
              reject(err)
            })
        }
      })
    },
  },
})
