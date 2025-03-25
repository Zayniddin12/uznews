import { defineStore } from 'pinia'

import {
  IAuthorArticleDetail,
  IAuthorCard,
  IAuthorSingle,
  IOtherAuthors,
} from '~/types/author'
import { IResponse } from '~/types/common'
import {
  IAuthorParams,
  IReportsResponse,
  ISpecialReports,
  ISpecialReportsParams,
} from '~/types/special-reports'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    articles: [] as ISpecialReports[],
    authors: [] as IAuthorCard[],
    authorsSecondList: [] as IAuthorCard[],
    authorsSearch: [] as IAuthorCard[],
    authorSingle: {} as IAuthorSingle,
    authorArticleDetail: [] as IAuthorArticleDetail[],
    recommendedAuthors: [] as IOtherAuthors[],
    articlesCount: 0,
    authorsCount: 0,
    articlesLoading: true,
    authorsLoading: true,
    params: {
      offset: 0,
      limit: 4,
      search: undefined,
    },
  }),
  actions: {
    fetchAuthorArticles(
      params: ISpecialReportsParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.articles.length > 0 && !force) {
        return new Promise((resolve, reject) => {
          resolve(this.articles)
        })
      } else {
        if (this.articles.length === 0) {
          this.articlesLoading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('news/AuthorArticlesList/', {
              params,
            })
            .then((res) => {
              this.articlesCount = res.count
              if (filter) {
                this.articles = res.results
              } else {
                this.articles.push(...res.results)
              }
              resolve(res)
              this.articlesLoading = false
            })
            .catch((err) => {
              reject(err)
            })
        })
      }
    },
    fetchAuthorsList(params: IAuthorParams, force?: boolean, filter?: boolean) {
      if (this.authors.length > 0 && !force) {
        return new Promise((resolve) => {
          resolve(this.authors)
        })
      } else {
        if (this.authors.length === 0) {
          this.authorsLoading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('/news/AuthorList/', {
              params,
            })
            .then((res) => {
              this.authorsCount = res.count
              if (filter) {
                if (params.search) {
                  this.authorsSearch = res.results
                } else {
                  this.authors = res.results
                }
              } else if (params.search) {
                this.authorsSearch.push(...res.results)
              } else {
                this.authors.push(...res.results)
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              setTimeout(() => {
                this.authorsLoading = false
              }, 300)
            })
        })
      }
    },
    fetchArticleSingle(id: number) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/AuthorDetail/${id}`, {})
          .then((res: IAuthorSingle) => {
            this.authorSingle = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchAuthorArticleDetail(id: number, params?: IAuthorParams) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/AuthorArticlesDetail/${id}`, { params })
          .then((res: IResponse<IAuthorArticleDetail>) => {
            this.authorArticleDetail = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchRecommendedAuthors(params: ISpecialReportsParams, id: number) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/AuthorRecommendList/${id}`, { params })
          .then((data: any) => {
            this.recommendedAuthors = data?.results
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    fetchAuthorsLists(
      params: IAuthorParams,
      force?: boolean,
      filter?: boolean
    ) {
      if (this.authorsSecondList.length > 0 && !force) {
        return new Promise((resolve) => {
          resolve(this.authorsSecondList)
        })
      } else {
        if (this.authorsSecondList.length === 0) {
          this.authorsLoading = true
        }
        return new Promise((resolve, reject) => {
          useApi()
            .$get<IReportsResponse>('/news/AuthorList/', {
              params,
            })
            .then((res) => {
              this.authorsCount = res.count
              if (filter) {
                if (params.search) {
                  this.authorsSearch = res.results
                } else {
                  this.authorsSecondList = res.results
                }
              } else if (params.search) {
                this.authorsSearch.push(...res.results)
              } else {
                this.authorsSecondList.push(...res.results)
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              setTimeout(() => {
                this.authorsLoading = false
              }, 300)
            })
        })
      }
    },
  },
})
