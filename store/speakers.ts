import { defineStore } from 'pinia'

import { INewsResponse, INewsSearch } from '~/types/news'
import {
  IReportsResponse,
  ISpecialReportsParams,
} from '~/types/special-reports'

export const useSpeakersStore = defineStore('speakersStore', {
  state: () => ({
    speakers: [] as IReportsResponse[],
    recommendedSpeakers: [] as IReportsResponse[],
    loading: true,
    count: 0,
    params: {
      offset: 0,
      limit: 5,
    },
    single: undefined,
    singleContent: undefined,
  }),
  actions: {
    fetchSpeakers(
      params: ISpecialReportsParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.speakers.length > 0 && !force) {
        return new Promise((resolve, reject) => {
          resolve(this.speakers)
        })
      } else {
        if (this.speakers.length === 0) {
          this.loading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('news/SpeakersList/', {
              params,
            })
            .then((res) => {
              this.count = res.count
              if (filter) {
                this.speakers = res.results
              } else {
                this.speakers.push(...res.results)
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              this.loading = false
            })
        })
      }
    },
    fetchSingleContent(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpeakersAndArticleContentItem/${slug}/`)
          .then((res: any) => {
            this.singleContent = res?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchSingle(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpeakersAndArticleDetail/${slug}/`)
          .then((res: any) => {
            this.single = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchRecommendedSpeakers(params: ISpecialReportsParams, slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpeakerRecommendList/${slug}`, { params })
          .then((data: any) => {
            this.recommendedSpeakers = data?.results
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
