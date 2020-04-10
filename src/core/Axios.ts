import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import { dispatchRequest } from './dispatchRequest'

export default class Axios {

  /**
   * 根请求方法
   * @param config 请求配置
   */
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  /**
   * 用于扩展接口，请求不包含 data
   * @param method 请求方法
   * @param url 请求地址
   * @param config Axios请求配置
   */
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request({ ...config, url, method })
  }

  /**
   * 用于扩展接口，请求包含 data
   * @param method 请求方法
   * @param url 请求地址
   * @param data 请求 data
   * @param config Axios请求配置
   */
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }

  /**
   * get 请求
   * @param url 请求地址
   * @param config 请求配置
   */
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('GET', url, config)
  }

  /**
   * post 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('POST', url, data, config)
  }

  /**
   * put 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('PUT', url, data, config)
  }

  /**
   * patch 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('PATCH', url, data, config)
  }

  /**
   * delete 请求
   * @param url 请求地址
   * @param config 请求配置
   */
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('DELETE', url, config)
  }

  /**
   * head 请求
   * @param url 请求地址
   * @param config 请求配置
   */
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('HEAD', url, config)
  }

  /**
   * options 请求
   * @param url 请求地址
   * @param config 请求配置
   */
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('OPTIONS', url, config)
  }
}
