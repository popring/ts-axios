import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import isFormData from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgess
    } = config
    const request = new XMLHttpRequest()

    configureRequest()

    // 创建一个请求
    request.open(method?.toUpperCase(), url!)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    // 发送请求
    request.send(data)

    // 配置Request请求
    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = true
      }
    }

    function addEvents() {
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

      // 处理网络错误
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      // 处理超时
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of  ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgess) {
        request.upload.onprogress = onUploadProgess
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
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
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 || response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
