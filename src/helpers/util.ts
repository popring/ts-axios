const toString = Object.prototype.toString

// TODO

// 判断是否为日期时间类型
export function isDate(val: any): boolean {
  return toString.call(val) === '[object Date]'
}

// // 暂时废弃 - 判断是否为对象类型
// export function isObject(val: any): boolean {
//   return val !== null && typeof val === 'object'
// }

// 判断是否为纯函数类型
export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

/**
 * 将 from 中的属性扩展到 to 中，包括原型上的属性
 * @param to 待扩展对象
 * @param from 扩展对象
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * 深度遍历合并对象
 * @param objs 对象
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

// 判断数据是否为FormData类型
export default function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}

// 判断是否为 URLSearchParams 类型
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
