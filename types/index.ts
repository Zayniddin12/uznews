export interface INews {
  id?: number
  title: string
  date: string
  views: number
  image: string
  category?: string
  isVideo?: boolean
  isVerified?: boolean
  comments?: number
}

export interface INewsList {
  id: number
  slug: string
  title: string
  views_count: number
  published_at: string
  cover_image: string
  comment_count: number
  is_verified: boolean
  is_video: boolean
  size_type: string
  category: {
    id: number
    title: string
    type: string
    slug: string
  }
}

export interface ILatest {
  id?: number
  title?: string
  date: string
  time: string
}

export interface ITabItem {
  label: string
  value: string
}
export interface INavigation {
  icon: string
  title: string
  url: string
}

export const buttonVariants = [
  'primary',
  'secondary',
  'primary-dark',
  'danger',
  'light',
] as const
export type ButtonVariants = (typeof buttonVariants)[number]

export interface IInterview {
  id: number
  slug: string
  image: string
  views_count: number
  title: string
  cover_image_optional: string
  rowFormat: boolean
  published_at: number
  with_whom: string
  video_duration: number
  video_url: string
}
export interface IColony {
  id: number
  title: string
  image: string
  description: string
  created_at: Date | string
  views_count: number
  userName: string
}

export interface ISocial {
  url: string
  icon: string
  subscribe: number
  title: string
}
export interface ISingleData {
  id: number
  title: string
  subtitle: string
  image: string
  youtube_video: string
  default: boolean
  standard: boolean
  full_width: boolean
  published_at: Date | string
  views_count: number
  likes_count: number
  dislikes_count: number
  is_liked: boolean
  is_disliked: boolean
  content: string | HTMLAllCollection
  author: string
  cover_image: string
  photo_author: string
  is_verified: boolean
  is_video: boolean
  hashtags: {
    id: number
    slug: string

    title: string
  }
  social_media: string | undefined
}
export interface ISingleContent {
  id: number
  content_item_type: string
  text: string
}
export interface INewsSingleData {
  title: string
  text: string
  image: string
  default: boolean
  standard: boolean
  full_width: boolean
  created_at: Date | string
  views_count: number
  content: string | HTMLAllCollection
  author: string
  author_image: string
}

export interface ISinglePhoto {
  title: string
  text: string
  image: string
  created_at: Date | string
  views_count: number
  content: string | HTMLAllCollection
  author: string
}
export interface IAuthorsData {
  id: number
  title: string
  slug: string
  type: string
  actual: boolean
  author: {
    id: number
    full_name: string
  }
  cover_image: string
  views_count: number
}

export interface IDiscussionData {
  id: number
  slug: string
  title: string
  cover_image: string
  author: {
    id: number
    full_name: string
    avatar: string
  }
  category: {
    id: number
    title: string
    type: string
    slug: string
  }
}

export interface ISocials {
  id: number
  title: string
  link: string
  follower_count: number
}
export interface IObject<T = any> {
  [key: string]: T //eslint-disable-line
}

export interface IContentLike {
  content: number
  // likeCount: number
}

export interface IContentDislike {
  content: number
  dislikeCount: number
}

export interface IHashtag {
  id: string
  title: string
  slug: string
}
export interface IlikeDislikeCount {
  like: number
  dislike: number
}

export interface IMediaList {
  id: number
  icon: string
  title: string
  link: string
  follower_count: number
}

export interface IBreakingNews {
  id: number
  news: {
    id: number
    title: string
  }
  expired_at: string
}

export interface IMenuLinkSettings {
  main: boolean
  popular: boolean
  author_articles: boolean
  special_reports: boolean
  photo_reports: boolean
}
