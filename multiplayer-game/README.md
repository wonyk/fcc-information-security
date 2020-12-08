## GHOSTS 2.0

GHOSTS 2.0 is a 2D real time multiplayer game using the HTML Canvas API and [Socket.io](https://socket.io/). It is a relatively simplistic game which had inspiration from Pacman, albeit reversing their roles.

It has completed all the requirements of the [Information Security Projects - Secure Real Time Multiplayer Game](https://www.freecodecamp.org/learn/information-security/information-security-projects/secure-real-time-multiplayer-game) project.

### Assignment and Documentation
- Multiple players can connect to a server and play.
- Each player has an avatar - blue ghost for current player and red ghosts for other players.
- Each player is represented by an object created by the `Player` class in `Player.mjs`.
- Each player object should contain a unique `id`, a `score`, and `x` and `y` coordinates representing the player's current position.
- The game has one type of collectible item and uses the `Collectible` class in `Collectible.mjs`.
- Each collectible item object created by the `Collectible` class contains a unique `id`, a `value`, and `x` and `y` coordinates representing the item's current position.
- Players can use the WASD and arrow keys to move their avatar.
- The `movePlayer` method accepts two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. `movePlayer` adjusts the `x` and `y` coordinates of the player object it's called from.
- The player's score is used to calculate their rank among the other players.
- The `calculateRank` method accepts an array of objects representing all connected players and return the string `Rank: currentRanking/totalPlayers`. For example, in a game with two players, if Player A has a score of 3 and Player B has a score of 5, `calculateRank` for Player A returns `Rank: 2/2`.
- Players can collide with a collectible item.
- The `collision` method accepts a collectible item's object as an argument. If the player's avatar intersects with the item, the `collision` method will return `true`.
- All players are kept in sync through the socket.io magic.
- Players can disconnect from the game at any time by simply closing the browser tab.
- Prevents client from guessing / sniffing the MIME type.
- Prevents cross-site scripting (XSS) attacks.
- Nothing from the website is cached in the client.
- The headers say that the site is powered by "PHP 7.4.3" even though it isn't (as a security measure).

### Development

To run this project locally:
```
1. Git clone or download this project
2. npm install (Node 14.x)
3. Create a .env file from the sample.env file
4. npm start to run
```

### Testing

* To run the tests on Repl.it, set NODE_ENV to test without quotes in the .env file.
* To run the tests in the console, use the command npm run test. To open the Repl.it console, press Ctrl+Shift+P (Cmd if on a Mac) and type "open shell".

### Acknowledgements

I would like to thank W3Schools and MDN for their wonderful guides. Even though I had little prior experience with the Canvas API, their guides allowed me to learn a lot in the process of completing this project.

Next, I am grateful to many blogs and websites, especially Stack Overflow and its users, which provided me with many guides and assistance when I faced technical issues.

Also, I would like to thank [classic gaming](http://www.classicgaming.cc/classics/pac-man/icons) for their wonderful downloadable icons which I had utilised as game sprites. 

Lastly, kudos to [Autoprefixer](https://autoprefixer.github.io) for this great CSS tool and [CodeMan38](https://fonts.google.com/specimen/Press+Start+2P?selection.family=Press+Start+2P) for the beautiful retro-looking game font.

### Supported Browsers

I had tested this application on Firefox 84.0+ (beta), Chrome and Edge (Chromium) 87.0+.

However, it is not working on IE. The issue lies in the usage of modules which is unsupported by IE.

Please contact me if there are any discrepancies.
