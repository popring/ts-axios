import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, headers } = config
  const request = new XMLHttpRequest()

  // 设置请求超时时间
  request.timeout = 3000

  // 返回数据类型
  request.responseType = 'text'

  // 创建一个请求
  request.open(method?.toUpperCase(), url)

  // 处理请求头
  Object.keys(headers).forEach(name => {
    if(data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    }else {
      request.setRequestHeader(name, headers[name])
    }
  })

  // 发送请求
  request.send(data)
}
