export interface IArticleAuthorsHashtags {
  id: number
  title: string
}
export interface IArticleAuthorsAuthor {
  id: number
  full_name: string
  avatar: string
  position: string
}

export interface IArticleAuthorsContent {
  id: number
  content_item_type: string
  text: string
}

export interface IArticleAuthorsDetail {
  id: number
  title: string
  subtitle: string
  type: string
  slug: string
  category: number
  views_count: number
  published_at: string
  hashtags: IArticleAuthorsHashtags[]
  author: IArticleAuthorsAuthor[]
  likes_count: number
  dislikes_count: number
}
