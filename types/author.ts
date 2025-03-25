import { IResponse } from './common'

export interface IAuthor {
  id: number
  full_name: string
  avatar: string
  position: string
}

export interface IAuthorCard extends IAuthor {
  instagram: string
  telegram: string
  facebook: string
  twitter: string
}

export interface IAuthor {
  id: number
  full_name: string
}
export interface ISpecialReports {
  id: number
  title: string
  slug: string
  author: IAuthor
  cover_image: string
  published_at: string
  views_count: number
}

export interface IReportsResponse extends IResponse {
  results: ISpecialReports[]
}
export interface ISpecialReportsParams {
  offset: number
  limit: number
  search?: string
}

export interface ISpecialReportContent {
  id: number
  content_item_type: string
  text: string
}

export interface IOtherAuthors {
  id: number
  full_name: string
  avatar: string
  position: string
  instagram: string
  telegram: string
  facebook: string
  twitter: string
}

export interface IAuthorSingle {
  id: number
  full_name: string
  position: string
  avatar: string
  background_image: string
  bio: string
  readers_count: number
  articles_count: number
}

export interface IAuthorArticleDetail {
  id: number
  cover_image: string
  title: string
  author: {
    id: number
    full_name: string
  }
}
