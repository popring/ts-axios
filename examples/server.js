const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

require('./server2')

const app = express()
const complier = webpack(webpackConfig)

app.use(
  webpackDevMiddleware(complier, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(complier))

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN', '1234abc')
    }
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ! 路由
const router = express.Router()
// * simple ************************************************
router.get('/simple/get', function(req, res) {
  res.json({
    msg: 'Hello World'
  })
})

// * base ************************************************
router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })

  req.on('end', () => {
    let buf = new Buffer(msg)
    res.json(buf.toJSON())
  })
})

// * error ************************************************

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: 'Hello World'
    })
  } else {
    res.sendStatus(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: 'Hello World'
    })
  }, 3000)
})

// * extend ************************************************

router.get('/extend/get', function(req, res) {
  res.json(req.params)
})

router.post('/extend/post', function(req, res) {
  res.json(req.body)
})

router.options('/extend/options', function(req, res) {
  res.json({
    msg: '访问成功'
  })
})

router.delete('/extend/delete', function(req, res) {
  res.json({
    msg: '访问成功'
  })
})

router.put('/extend/put', function(req, res) {
  res.json(req.body)
})

router.patch('/extend/patch', function(req, res) {
  res.json(req.body)
})

// ---------------------------------------------------------------

router.get('/interceptor/get', function(req, res) {
  res.end('hello')
})

// ---------------------------------------------------------------
router.post('/config/post', function(req, res) {
  res.json(req.body)
})

// ---------------------------------------------------------------
router.get('/cancel/get', function(req, res) {
  setTimeout(() => {
    res.json('hello')
  }, 1000)
})

router.post('/cancel/post', function(req, res) {
  setTimeout(() => {
    res.json(req.body)
  }, 1000)
})

// ---------------------------------------------------------------
router.get('/more/get', function(req, res) {
  res.json(req.cookies)
})

router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body)
  } else {
    res.status(401)
    res.end('UnAuthorization')
  }
})

router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})

router.get('/more/A', function(req, res) {
  res.end('A')
})

router.get('/more/B', function(req, res) {
  res.end('B')
})

const multipart = require('connect-multiparty')
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, ctrl+c to stop`)
})
