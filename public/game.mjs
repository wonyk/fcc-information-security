import Player from './Player.mjs'
import Collectible from './Collectible.mjs'

const socket = io()

let player
let collectible
const keys = []
let localPlayersData = {}
// load all the images at the start:
const playerImg = new Image()
const otherPlayerImg = new Image()
const itemImg = new Image()

playerImg.src = '../public/img/pixel-ghost-blue-48x48.png'
otherPlayerImg.src = '../public/img/pixel-ghost-red-48x48.png'
itemImg.src = '../public/img/pixel-pac-man-24x24.png'

const moveSpeed = 5

const canvas = document.getElementById('game-window')
const context = canvas.getContext('2d')

/* All the socket functions are listed here */
// Initialise the game state and prepare for rendering
socket.on('initialise', (itemData, playerData) => {
  collectible = new Collectible({ x: itemData.x, y: itemData.y, value: itemData.value, id: itemData.id })
  player = new Player({ x: playerData.x, y: playerData.y, score: 0, id: playerData.id })

  requestAnimationFrame(determineDirection)
  requestAnimationFrame(draw)
})

socket.on('relocateItem', item => {
  const { x, y, value, id } = item
  collectible.x = x
  collectible.y = y
  collectible.value = value
  collectible.id = id
})

socket.on('state', playersData => {
  localPlayersData = Object.assign({}, playersData)
})

// Add keyboard listener
window.addEventListener('keydown', e => {
  keys[e.key] = true
})
window.addEventListener('keyup', e => {
  keys[e.key] = false
})

const draw = () => {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  context.drawImage(itemImg, collectible.x, collectible.y)

  if (!localPlayersData[socket.id]) {
    return false
  }

  const { score = 0, id = -1 } = localPlayersData[socket.id]
  player.score = score
  player.id = id

  document.getElementById('score').textContent = `Score:${score}`

  for (const player in localPlayersData) {
    drawPlayer(localPlayersData[player])
  }

  const ranking = player.calculateRank(localPlayersData)
  document.getElementById('ranking').textContent = ranking

  requestAnimationFrame(draw)
}

const drawPlayer = data => {
  if (data.id === socket.id) {
    context.drawImage(playerImg, data.x, data.y)
    return
  }
  context.drawImage(otherPlayerImg, data.x, data.y)
}

// Shifts the position of the user and also check for collision
const determineDirection = () => {
  if (!keys) {
    return true
  }

  if (keys.a || keys.ArrowLeft || keys.A) {
    if (!keys.d && !keys.ArrowRight && !keys.D) {
      player.movePlayer('left', moveSpeed, socket)
      socket.emit('movePlayerX', player.x)
    }
  } else if (keys.d || keys.ArrowRight || keys.D) {
    player.movePlayer('right', moveSpeed, socket)
    socket.emit('movePlayerX', player.x)
  }

  if (keys.w || keys.ArrowUp || keys.W) {
    if (!keys.s && !keys.ArrowDown && !keys.S) {
      player.movePlayer('up', moveSpeed, socket)
      socket.emit('movePlayerY', player.y)
    }
  } else if (keys.s || keys.ArrowDown || keys.S) {
    player.movePlayer('down', moveSpeed, socket)
    socket.emit('movePlayerY', player.y)
  }

  if (player.collision(collectible)) {
    socket.emit('claim', collectible)
  }

  requestAnimationFrame(determineDirection)
}
