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
