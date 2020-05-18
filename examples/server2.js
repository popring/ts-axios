const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.get('/more/server2', function(req, res) {
  console.log(111)
  res.set(cors)
  res.json(req.cookies)
})


router.post('/more/server2', function(req, res) {
  console.log(222)
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/server2', function(req, res) {
  console.log(333)
  res.set(cors)
  res.end()
})

app.use(router)

const port = 8088
module.exports = app.listen(port)
