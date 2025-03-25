import { IAuthor } from './author'

export interface IPodcast {
  id: number
  title: string
  slug: string
  views_count: string
  published_at: string
  cover_image: string
  podcast_type: string
}
export interface IHashtag {
  id: number
  title: string
}
export interface IPodcastDetail {
  id: number
  title: string
  slug: string
  subtitle: string
  podcast_type: string
  cover_image: string
  file: string
  link: null | string
  hashtags: IHashtag[]
  author: IAuthor
  views_count: number
  likes_count: number
  dislikes_count: number
}
