import { AxiosRequestConfig, AxiosPromise } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequst } from './helpers/data'
import { processHeaders } from './helpers/headers'

// 主函数
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
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

// 转换url
function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}

// 转换data
function transformRequest(config: AxiosRequestConfig) {
  return transformRequst(config.data)
}

export default axios
