import { defineStore } from 'pinia'

import { IMenuLinkSettings } from '~/types'
import {
  IReportsResponse,
  ISpecialReports,
  ISpecialReportsParams,
} from '~/types/special-reports'

export const useInterviewStore = defineStore('interviews', {
  state: () => ({
    interviews: [] as ISpecialReports[],
    interviewSingle: [],
    interviewSingleContent: [],
    interviewRecommendList: [],
    count: 0,
    loading: true,
    params: {
      offset: 0,
      limit: 4,
      search: undefined,
    },
  }),
  actions: {
    fetchInterviews(
      params: ISpecialReportsParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.interviews.length > 0 && !force) {
        return new Promise((resolve, reject) => {
          resolve(this.interviews)
        })
      } else {
        if (this.interviews.length === 0) {
          this.loading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('news/InterviewList/', {
              params,
            })
            .then((res) => {
              this.count = res.count
              if (filter) {
                this.interviews = res.results
              } else {
                this.interviews.push(...res.results)
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
    fetchInterviewSingle(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/InterviewDetail/${slug}/`, {})
          .then((res: any) => {
            this.interviewSingle = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchInterviewSingleDetail(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/InterviewContentItem/${slug}`, {})
          .then((res: any) => {
            this.interviewSingleContent = res?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchInterviewRecommendList(params: ISpecialReportsParams, slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/InterviewRecommendList/${slug}`, { params })
          .then((res: any) => {
            this.interviewRecommendList = res?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
