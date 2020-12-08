const playerWidth = 50
const playerHeight = 50
const itemWidth = 25
const itemHeight = 25
const canvasWidth = 640
const canvasHeight = 480

class Player {
  constructor ({ x, y, score, id }) {
    this.x = x
    this.y = y
    this.score = score
    this.id = id

    this.speedX = 0
    this.speedY = 0
  }

  movePlayer (dir, speed) {
    if (dir === 'left') {
      this.x -= speed
    } else if (dir === 'right') {
      this.x += speed
    } else if (dir === 'up') {
      this.y -= speed
    } else {
      this.y += speed
    }

    if (this.x < 0) {
      this.x = 0
    } else if (this.x > canvasWidth - playerWidth) {
      this.x = canvasWidth - playerWidth
    }

    if (this.y < 0) {
      this.y = 0
    } else if (this.y > canvasHeight - playerWidth) {
      this.y = canvasHeight - playerHeight
    }
  }

  collision (item) {
    // define the borders of the player
    const userLeft = this.x
    const userRight = this.x + playerWidth
    const userTop = this.y
    const userDown = this.y + playerHeight

    const itemLeft = item.x
    const itemRight = item.x + itemWidth
    const itemTop = item.y
    const itemDown = item.y + itemHeight

    let collected = true
    if ((userLeft > itemRight) || (userRight < itemLeft) || (userTop > itemDown) || (userDown < itemTop)) {
      collected = false
    }

    return collected
  }

  calculateRank (arr) {
    let rank = 1
    let size = 0
    for (const player in arr) {
      size++
      if (arr[player].score > this.score) {
        rank++
      }
    }

    return `Rank: ${rank}/${size}`
  }
}

export default Player
