import { defineStore } from 'pinia'

import { IPodcastDetail, IHashtag } from '~/types/podcast'
import { IAuthor } from '~/types/author'

export const usePodcastDetails = defineStore('podcastDetails', {
  state: () => ({
    podcastDetails: null as IPodcastDetail | null,
    hashtags: [] as IHashtag[],
    author: {} as IAuthor,
    loading: true,
  }),
  actions: {
    fetchPodcastDetails(slug: string): Promise<IPodcastDetail> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IPodcastDetail>(`/news/PodcastDetail/${slug}/`)
          .then((res) => {
            this.podcastDetails = res
            this.hashtags = res.hashtags
            this.author = res.author
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  getters: {
    async getPodcastDetails(): Promise<IPodcastDetail | null> {
      if (!this.podcastDetails) {
        await this.fetchPodcastDetails()
      }
      return this.podcastDetails
    },
  },
})
