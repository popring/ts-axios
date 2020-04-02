import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null } = config
  const request = new XMLHttpRequest()

  // 设置请求超时时间
  request.timeout = 3000

  // 返回数据类型
  request.responseType = 'text'

  // 创建一个请求
  request.open(method?.toUpperCase(), url)

  // 发送请求
  request.send(data)
}
