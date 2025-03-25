export interface IPagination {
  offset: number
  limit: number
}

export interface IResponse<T = any> { //eslint-disable-line
  count: number
  next: string | null
  previous: null | string
  results: T[]
}
