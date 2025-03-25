export interface IPhotoReports {
  id: number
  title: string
  slug: string
  cover_image: string
  images: [
    {
      id: number
      image: string
    }
  ]
  image_count: number
}
export interface IPhotoReportsHashTags {
  id: number
  title: string
}
export interface IPhotoReportsAuthor {
  id: number
  full_name: string
}
export interface IPhotoReportsImageListView {
  id: number
  image: string
}
export interface IPhotoReportsLightBox {
  id: number
  photo: string
}
export interface IPhotoReportsContent {
  id: number
  content_item_type: string
  photo: string
  photo_author: string
  photo_size: string
  text: string
}

export interface IPhotoReportsDetail {
  id: number
  title: string
  subtitle: string
  views_count: number
  published_at: string
  likes_count: number
  dislikes_count: number
  is_liked: boolean
  is_disliked: boolean
  hashtags: IPhotoReportsHashTags[]
  social_media: {
    id: number
    title: string
    link: string
  }

}
