const toString = Object.prototype.toString

// TODO

// 判断是否为日期时间类型
export function isDate(val: any): boolean {
  return toString.call(val) === '[object Date]'
}

// 判断是否为对象类型
export function isObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}
