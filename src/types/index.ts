// axios 请求配置
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// axios 响应
export interface AxiosResponse {
  data?: any
  status?: any
  statusText: string
  headers?: any
  config?: AxiosRequestConfig
  request?: XMLHttpRequest
}

export interface AxiosPromise extends Promise<AxiosResponse> {}


// 请求方法
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'patch'
  | 'PATCH'
