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

// axios 请求配置
export interface AxiosRequestConfig {
  [propName: string]: any
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // 返回数据类型
  responseType?: XMLHttpRequestResponseType
  // 超时
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  // 跨域携带cookies
  withCredentials?: boolean
  // xsrf防御
  xsrfCookieName?: string
  xsrfHeaderName?: string
  // 下载监控
  onDownloadProgress?: (e: ProgressEvent) => void
  // 上传监控
  onUploadProgess?: (e: ProgressEvent) => void
  // Authorization 属性
  auth?: AxiosBasicCredentials
  // 自定义合法状态码规则
  validateStatus?: (status: number) => boolean
  // 自定义参数解析规则
  paramsSerializer?: (params: any) => string
  // 根地址
  baseURL?: string
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// axios 响应
export interface AxiosResponse<T = any> {
  data: T
  status: any
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// Axios 错误类型
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: XMLHttpRequest
  response?: AxiosResponse
}

// Axios 扩展接口
interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosResponse>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// Axios 实例
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// Axios 拦截器
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolveFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (excutor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
