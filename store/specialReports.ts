import { defineStore } from 'pinia'

import { INewsCommentSlug } from '~/types/news'
import {
  IReportsResponse,
  ISpecialReportContent,
  ISpecialReportDetail,
  ISpecialReports,
  ISpecialReportsParams,
} from '~/types/special-reports'

export const useSpecialReportsStore = defineStore('specialReports', {
  state: () => ({
    specialReports: [] as ISpecialReports[],
    recommendedSpecialReports: [] as ISpecialReports[],
    count: 0,
    loading: true,
    specialReportsContent: [] as ISpecialReportContent[],
    specialReportsDetail: [] as ISpecialReportDetail[],
    params: {
      offset: 0,
      limit: 5,
      search: undefined,
    },
  }),
  actions: {
    fetchSpecialReports(
      params?: ISpecialReportsParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.specialReports.length > 0 && !force) {
        return new Promise((resolve, reject) => {
          resolve(this.specialReports)
        })
      } else {
        if (this.specialReports.length === 0) {
          this.loading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('news/SpecialReportsList/', {
              params,
            })
            .then((res) => {
              this.count = res.count
              this.loading = false
              if (filter) {
                this.specialReports = res.results
              } else {
                this.specialReports.push(...res.results)
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      }
    },
    fetchSReportsSingleContent(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpecialReportsContentItem/${slug}/`, {})
          .then((res: any) => {
            this.specialReportsContent = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchSReportsSingleDetail(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpecialReportsDetail/${slug}`, {})
          .then((res: any) => {
            this.specialReportsDetail = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchRecommendedSpecialReports(
      params: ISpecialReportsParams,
      slug: string
    ) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpecialReportsList/${slug}`, { params })
          .then((data: any) => {
            this.recommendedSpecialReports = data?.results
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
