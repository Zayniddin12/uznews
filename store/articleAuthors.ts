import { defineStore } from 'pinia'

import { IAuthorsData } from '~/types'
import {
  IArticleAuthorsContent,
  IArticleAuthorsDetail,
} from '~/types/articleAuthors'
import { ISpecialReportsParams } from '~/types/special-reports'

export const useArticleAuthorsStore = defineStore('articleAuthors', {
  state: () => ({
    loading: true,
    recommendedArticleList: [] as IAuthorsData[],
    articleAuthorsContent: [] as IArticleAuthorsContent[],
    articleAuthorsDetail: [] as IArticleAuthorsDetail[],
  }),
  actions: {
    fetchArticleAuthorsSingleContent(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpeakersAndArticleContentItem/${slug}`, {})
          .then((res: any) => {
            this.articleAuthorsContent = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchArticleAuthorsSingleDetail(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/SpeakersAndArticleDetail/${slug}`, {})
          .then((res: any) => {
            this.articleAuthorsDetail = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchRecommendedArticleList(params: ISpecialReportsParams, slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/AuthorArticleRecommendList/${slug}`, { params })
          .then((data: any) => {
            this.recommendedArticleList = data?.results
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
