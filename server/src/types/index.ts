export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string | Record<string, unknown>
}

export const successResponse = <T>(data: T): ApiResponse<T> => {
  return {
    success: true,
    data: data
  }
}

export interface PageQuery {
  pageIndex?: number
  search?: string
  [key: string]: string | number | undefined
}

export interface UserLogin {
  user_name: string
  password: string
}
