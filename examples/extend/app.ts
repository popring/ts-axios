import axios from '../../src/index'

axios({
  url: '/extend/get',
  method: 'get',
  data: {
    msg: '1'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.post('/extend/post', { msg: 'post' })

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
