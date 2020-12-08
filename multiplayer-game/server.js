require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const nocache = require('nocache')

const fccTestingRoutes = require('./routes/fcctesting.js')
const runner = require('./test-runner.js')

const app = express()

app.use(helmet.noSniff())
app.use(nocache())
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'PHP 7.4.3')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

app.use('/public', express.static(process.cwd() + '/public'))
app.use('/assets', express.static(process.cwd() + '/assets'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
  })

// For FCC testing purposes
fccTestingRoutes(app)

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found')
})

const portNum = process.env.PORT || 3000

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`)

  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...')
    setTimeout(function () {
      try {
        runner.run()
      } catch (error) {
        console.log('Tests are not valid:')
        console.error(error)
      }
    }, 1500)
  }
})

require('./socket.js')(server)

module.exports = app // For testing