import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequst } from './helpers/data'

// 主函数
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

// 修改config参数
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.data = transformRequest(config)
}

// 转换url
function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}

// 转换参数
function transformRequest(config: AxiosRequestConfig) {
  return transformRequst(config.data)
}

export default axios
