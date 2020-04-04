import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 设置请求超时时间
    request.timeout = 3000

    // 创建一个请求
    request.open(method?.toUpperCase(), url)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return

      const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        status: request.status,
        statusText: request.statusText,
        data: responseData,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    // 处理请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发送请求
    request.send(data)
  })
}
