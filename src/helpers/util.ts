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
