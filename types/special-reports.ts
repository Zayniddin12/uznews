import { TArray } from 'ts-interface-checker'

import { IResponse } from '~/types/common'
import { IHashtag } from '~/types/news'

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

export interface IAuthorParams {
  offset: number
  limit: number
  search?: string
}

export interface ISpecialReportContent {
  id: number
  content_item_type: string
  text: string
}
export interface IAuthorDetail {
  id: number
  full_name: string
  avatar: string
  position: string
}

export interface ISpecialReportDetail extends ISpecialReports {
  subtitle: string
  hashtags: IHashtag[]
  author: IAuthorDetail
  likes_count: number
  dislikes_count: number
}
