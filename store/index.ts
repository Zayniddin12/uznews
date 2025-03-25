import { defineStore } from 'pinia'

import {
  IBreakingNews,
  IContentDislike,
  IContentLike,
  IlikeDislikeCount,
  IMenuLinkSettings,
  IStaticPageList,
  IStaticPageSingle,
} from '~/types'
import { INewsSearchListParams } from '~/types/news'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    showMobile: false,
    languageSwitch: false,
    localeMessagesFetched: false,
    staticPageList: [] as IStaticPageList[],
    breakingNews: {} as IBreakingNews,
    staticPageSingle: {} as IStaticPageSingle,
    newsList: [],
    popularNewsList: [],
    popularList: [],
    discussionList: [],
    interviewList: [],
    authorsArticleList: [],
    authorsList: [],
    mediaList: [],
    menuLinkSettings: {} as IMenuLinkSettings,
    mainSettings: null as null | {},
    loading: true,
    params: {
      offset: 0,
      limit: 8,
    },
  }),

  actions: {
    async nuxtServerInit() {},
    fetchNewsList(params?: INewsSearchListParams) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/news/NewsList/', { params })
          .then((data: any) => {
            if (params?.is_popular) {
              this.popularNewsList = data.results
            } else {
              this.newsList = data.results
            }
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchDiscussionList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/news/DiscussionList/')
          .then((data: any) => {
            this.discussionList = data.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchInterviewList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/news/InterviewList/')
          .then((data: any) => {
            this.interviewList = data.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchAuthorsArticlesList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/news/AuthorArticlesList/')
          .then((data: any) => {
            this.authorsArticleList = data.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchAuthorsList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/news/AuthorList/')
          .then((data: any) => {
            this.authorsList = data.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchSocialMediaList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/common/SocialMediaList')
          .then((data: any) => {
            this.mediaList = data.results
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateContentLike(body: IContentLike) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post(`news/AddRemoveContentLike/`, { body })
          .then((data: any) => {
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    updateContentDislike(body: IContentDislike) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post(`news/AddRemoveContentDislike/`, { body })
          .then((data: any) => {
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    feedbackCreate(body: IContentLike) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post(`common/FeedBackCreate/`, { body })
          .then((data: any) => {
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    fetchStaticPageList() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/StaticPageList`)
          .then((res: any) => {
            this.staticPageList = res?.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchStaticPageSingle(slug: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/StaticPageDetail/${slug}`)
          .then((res: any) => {
            this.staticPageSingle = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchBreakingNews() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`news/BreakingNews/`)
          .then((res: any) => {
            this.breakingNews = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchMenuLinkSettings() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/MenuLinkSettings`, {})
          .then((data: IMenuLinkSettings) => {
            this.menuLinkSettings = data
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
    fetchMainSettings() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`common/MainSettings`, {})
          .then((data: any) => {
            this.mainSettings = data
            resolve(data)
          })
          .catch((err) => reject(err))
      })
    },
  },
  getters: {},
})
