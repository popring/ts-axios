import { isPlainObject } from './util'

// 转换请求参数
export function transformRequest<T>(data: T): string | T {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 返回数据转换为对象
export function transformResponse<T>(data: T): T {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do something
    }
  }
  return data
}
