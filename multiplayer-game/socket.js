const socket = require('socket.io')
const crypto = require('crypto')

const itemWidth = 25
const itemHeight = 25
const playerWidth = 50
const playerHeight = 50
const canvasWidth = 640
const canvasHeight = 480
let lastClaimed = ''

module.exports = function (server) {
  const io = socket(server)

  const allPlayers = {}

  const itemDetails = {
    x: Math.floor(Math.random() * (canvasWidth - itemWidth)),
    y: Math.floor(Math.random() * (canvasHeight - itemHeight)),
    value: 1,
    id: crypto.randomBytes(6).toString('hex')
  }

  io.on('connection', socket => {
    console.log(`socket id: ${socket.id} connected`)
    allPlayers[socket.id] = {
      x: Math.floor(Math.random() * (canvasWidth - playerWidth)),
      y: Math.floor(Math.random() * (canvasHeight - playerHeight)),
      score: 0,
      id: socket.id
    }

    socket.emit('initialise', itemDetails, allPlayers[socket.id])

    socket.on('movePlayerX', x => {
      if (x < 0) {
        x = 0
      } else if (x > canvasWidth - playerWidth) {
        x = canvasWidth - playerWidth
      }
      allPlayers[socket.id].x = Math.floor(x)
    })

    socket.on('movePlayerY', y => {
      if (y < 0) {
        y = 0
      } else if (y > canvasHeight - playerHeight) {
        y = canvasHeight - playerHeight
      }
      allPlayers[socket.id].y = Math.floor(y)
    })

    socket.on('claim', collectible => {
      if (collectible.id !== itemDetails.id || lastClaimed === collectible.id) {
        return false
      }

      lastClaimed = collectible.id
      itemDetails.x = Math.floor(Math.random() * (640 - itemWidth))
      itemDetails.y = Math.floor(Math.random() * (480 - itemHeight))
      itemDetails.id = crypto.randomBytes(6).toString('hex')
      allPlayers[socket.id].score++

      io.emit('relocateItem', itemDetails)
    })

    socket.on('disconnect', () => {
      delete allPlayers[socket.id]
      console.log(`socket id: ${socket.id} disconnected`)
    })
  })

  setInterval(() => {
    io.emit('state', allPlayers)
  }, 1000 / 60)
}
