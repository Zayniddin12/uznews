import { defineStore } from 'pinia'

import { INewsList } from '~/types'
import { IPagination } from '~/types/common'
import {
  IFilterCommentParams,
  INewsCategoryList,
  INewsCommentItem,
  INewsResponse,
  INewsSearch,
  INewsSearchListParams,
} from '~/types/news'
import { ISpecialReportsParams } from '~/types/special-reports'

export const useNewsStore = defineStore('newsStore', {
  state: (): {
    hasNext: string | null
    newsSearchList: INewsSearch[]
    newsList: INewsList[]
    recommendedNews: INewsList[]
    newsCategoryList: INewsCategoryList[]
    newsListCount: number
    newsSearchListCount: number
    newsCommentList: any[]
    filteredComments: INewsCommentItem[]
    popularNewsList: INewsList[]
    params: INewsSearchListParams
    searchListLoading: boolean
    loading: boolean
    singleContent: any
    single: any
    commentCount: number
  } => ({
    newsSearchList: [] as INewsSearch[],
    newsList: [] as INewsList[],
    recommendedNews: [] as INewsList[],
    newsCategoryList: [] as INewsCategoryList[],
    newsListCount: 0,
    newsSearchListCount: 0,
    newsCommentList: [],
    filteredComments: [] as INewsCommentItem[],
    popularNewsList: [] as INewsList[],
    hasNext: null,
    params: {
      offset: 0,
      limit: 5,
    } as INewsSearchListParams,
    searchListLoading: true,
    loading: true,
    singleContent: undefined,
    single: undefined,
    commentCount: 0,
  }),
  actions: {
    fetchSearchList(params: INewsSearchListParams, merge?: boolean) {
      this.searchListLoading = !merge

      return new Promise((resolve, reject) => {
        useApi()
          .$get<INewsResponse>('news/SearchList/', {
            params,
          })
          .then((res: INewsResponse) => {
            this.newsSearchListCount = res.count
            if (!merge) {
              this.newsSearchList = res.results
            } else {
              this.newsSearchList.push(...res.results)
            }
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            setTimeout(() => {
              this.searchListLoading = false
            }, 300)
          })
      })
    },
    fetchNewsList(
      params: INewsSearchListParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.newsList.length > 0 && !force) {
        return new Promise((resolve) => {
          resolve(this.newsList)
        })
      } else {
        if (!this.newsList.length) {
          this.loading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<INewsResponse>('news/NewsList/', {
              params,
            })
            .then((res) => {
              this.newsListCount = res.count
              this.hasNext = res.next
              if (filter) {
                this.newsList = res.results
              } else {
                this.newsList = [...this.newsList, ...res.results]
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
    fetchNewsComment(params: IPagination, slug: string, merge?: boolean) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/CommentList/${slug}/`, { params })
          .then((res: any) => {
            const data: any = [...res.results].map((item: any) => {
              return {
                ...item,
                is_open: false,
              }
            })
            if (merge) {
              this.newsCommentList = [...this.newsCommentList, ...data]
            } else {
              this.newsCommentList = data
            }
            this.commentCount = res?.count
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            setTimeout(() => {
              this.searchListLoading = false
            }, 300)
          })
      })
    },
    fetchNewsSingleContent(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/NewsContentItem/${slug}/`)
          .then((res: any) => {
            this.singleContent = res?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchNewsSingle(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/NewsDetail/${slug}/`)
          .then((res: any) => {
            this.single = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchNewsCategoryList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<INewsCategoryList>('news/CategoryNewsList/')
          .then((data) => {
            this.newsCategoryList = data.results
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchNewsRecommendedList(params: ISpecialReportsParams, slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/NewsRecommendList/${slug}`, { params })
          .then((res: any) => {
            this.recommendedNews = res?.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
