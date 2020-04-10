import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequst, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

// 主函数
export function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 修改config参数
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequest(config)
}

// 转换headers
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// TODO 转换url
function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url!, params)
}

// 转换请求data
function transformRequest(config: AxiosRequestConfig) {
  return transformRequst(config.data)
}

// 转换返回data
function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)
  return res
}
