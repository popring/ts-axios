import { isDate, isPlainObject, isURLSearchParams } from './util'

// 转义url中字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 拼接url地址参数
 * @param url url地址
 * @param params 参数
 * @returns 返回拼接后的 url 地址
 */
export function buildURL(
  url: string,
  params?: any,
  paramsSerilizer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerilizer) {
    serializedParams = paramsSerilizer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      let val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values: any[]
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    serializedParams = parts.join('&')
  }
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url += url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

interface URLOrigin {
  protocol: string
  host: string
}

// 同源请求判断
export function isURLSameOrigin(rqeustURL: string): boolean {
  const parsedOrigin = resolveURL(rqeustURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
