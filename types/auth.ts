export interface IAuthLogin {
  password: string
  phone: string
  email: string
}
export interface IAuthRegister {
  full_name: string
  password: string
  email?: string
  phone_number?: string
}
export interface IAuthLoginResponse {
  refresh: string
  access: string
}
export interface IAuthRegisterResponse {}

export enum ESocialAuth {
  GOOGLE = 'google',
  ONEID = 'oneid',
  TWITTER = 'twitter',
  TELEGRAM = 'telegram',
  YANDEX = 'yandex',
  VK = 'vk',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
}

export interface ILoginViaGoogleData {
  access_token: string
  device_id: string
}

export interface ILoginViaGoogleResponse {
  'user-uuid'?: string
  access?: string
  refresh?: string
}

export interface IOauthPayload {
  code: string
  access_token: string
}

export interface IOauthResponse {
  'user-uuid': string
  access: string
  refresh: string
}
