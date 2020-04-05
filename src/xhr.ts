import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 创建一个请求
    request.open(method?.toUpperCase(), url)

    // 处理请求
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) return

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
      handleResponse(response)
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 || response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }

    // 处理请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 处理网络错误
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    if (timeout) {
      request.timeout = timeout
    }

    // 处理超时
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of  ${timeout} ms exceeded`))
    }

    // 发送请求
    request.send(data)
  })
}
