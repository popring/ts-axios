import { isPlainObject } from './util'

// 转换请求参数
export function transformRequst<T>(data: T): string | T {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
