import axios from '../../src/index'

// 数组
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 对象
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 时间日期
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 过滤null
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// 过滤 hash #
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// 合并参数
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

// post请求 转换data
axios({
  method: 'POST',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
axios({
  method: 'POST',
  url: '/base/post',
  headers: '',
  data: {
    a: 1,
    b: 2
  }
})
// data 为某些类型如（URLSearchParams）时，浏览器会自动添加合适的 Content-Type
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

// 处理buffer
const arr = new Int32Array([21, 32])
axios({
  method: 'POST',
  url: '/base/buffer',
  data: arr
})

axios({
  method: 'POST',
  url: '/base/post',
  responseType: 'text',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(typeof res.data, 'string')
})
axios({
  method: 'POST',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(typeof res.data === 'object')
})
