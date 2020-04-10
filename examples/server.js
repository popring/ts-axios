const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

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

app.use(express.static(__dirname))

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

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, ctrl+c to stop`)
})
