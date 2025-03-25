import { defineStore } from 'pinia'

import {
  IPhotoReportsContent,
  IPhotoReportsDetail,
  IPhotoReportsImageListView,
} from '~/types/photo-reports'
import {
  IReportsResponse,
  ISpecialReports,
  ISpecialReportsParams,
} from '~/types/special-reports'

export const usePhotoReportsStore = defineStore('photoReports', {
  state: () => ({
    reports: [] as ISpecialReports[],
    count: 0,
    loading: true,
    photoReportsContent: [] as IPhotoReportsContent[],
    photoReportsDetail: [] as IPhotoReportsDetail[],
    photoReportsImage: [] as IPhotoReportsImageListView[],
    recommendedPhotoReports: [],
    params: {
      offset: 0,
      limit: 5,
    },
  }),
  actions: {
    fetchPhotoReports(
      params: ISpecialReportsParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.reports.length > 0 && !force) {
        return new Promise((resolve, reject) => {
          resolve(this.reports)
        })
      } else {
        if (this.reports.length === 0) {
          this.loading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('news/PhotoReportsListView/', {
              params,
            })
            .then((res) => {
              this.count = res.count
              if (filter) {
                this.reports = res.results
              } else {
                this.reports.push(...res.results)
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
    fetchPhotoReportsSingleContent(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/PhotoReportsContentItem/${slug}/`, {})
          .then((res: any) => {
            this.photoReportsContent = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchPhotoReportsSingleDetail(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/PhotoReportsDetailView/${slug}/`, {})
          .then((res: any) => {
            this.photoReportsDetail = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchPhotoReportsSingleImage(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/PhotoReportsImagesListView/${slug}`, {})
          .then((res: any) => {
            this.photoReportsImage = res.results
            resolve(res)
            this.loading = false
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchRecommendedPhotoReports(params: ISpecialReportsParams, slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/PhotoReportsRecommendList/${slug}`, { params })
          .then((data: any) => {
            this.recommendedPhotoReports = data?.results
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
