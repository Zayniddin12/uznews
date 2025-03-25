import { defineStore } from 'pinia'

import { IPagination, IResponse } from '~/types/common'
import { IPodcast } from '~/types/podcast'

export const usePodcastsStore = defineStore('podcastsStore', {
  state: () => ({
    podcasts: [] as IPodcast[],
    newsCount: 0,
    contentSlug: '',
    next: null as string | null,
    params: {
      limit: 10,
      offset: 0,
    } as IPagination,
    loading: true,
  }),
  actions: {
    fetchPodcasts(
      limit?: number,
      force?: boolean
    ): Promise<IResponse<IPodcast>> | undefined {
      if (!this.podcasts.length) {
        this.loading = true
      }
      if (!this.podcasts?.length || force) {
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IResponse<IPodcast>>('news/PodcastList/', {
              params: {
                ...this.params,
                limit,
              },
            })
            .then((res: IResponse<IPodcast>) => {
              this.newsCount = res.count
              this.next = res.next

              this.podcasts.push(...res.results)

              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      }
    },
    resetState() {
      this.podcasts = []
    },
  },
  getters: {
    async getPodcasts(): Promise<IPodcast[] | undefined> {
      if (this.podcasts.length === 0) {
        await this.fetchPodcasts()
      }
      this.loading = false
      return this.podcasts
    },
  },
})
