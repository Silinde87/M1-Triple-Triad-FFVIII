# M1-Triple-Triad-FFVIII

## How it looks

🔗 [Live Demo](https://silinde87.github.io/M1-Triple-Triad-FFVIII/)

## Description
Game Card Triple Triad from Final Fantasy VIII replica. Each player starts with five cards and places one card for each turn on the board. The one with the highest rank converts the adjacent one.
The player with the most cards on the board wins the game.



## MVP (DOM - CANVAS)
Player vs player plays the card game with a keyboard.
Without "hand cursor", just only changing card borders.
Without game card name label.
Without animations. Card disappear from hand and appears at gameboard.


## Backlog
- Define classes and objects
- Implement Game Logic for player vs player
- Create animations for card movements
- Add music and sound effects
- Implement Random IA for player vs IA
- Implement realistic IA
- Add mouse support


## Data structure
### main.js
```
const game = new Game();
const splashScreen = HTMLElement;
const gameScreen = HTMLElement;
const gameOverScreen = HTMLElement;
let gameStatus; // Allows switch the "return key" behaviour.

// Splash screen.
createSplashScreen()
removeSplashScreen()

// Game screen.
creteGameScreen()
removeGameScreen()

// Gameover Screen.
createGameOverScreen()
removeGameOverScreen()

// Assist Function. Creates HTML Elements on demand.
createHTMLElement()

startGame()
endGame()

handleEnterKeyDown()
handleArrowKeyDown()
```
### game.js
```
Class Game(gameScreen){
    this.canvas;
    this.ctx;
    this.gameScreen;
    this.player;
    this.opponent;
    this.gameIsOver = false;
    this.whichPlayerIsUp;
    this.playerNumCardsElem = HTMLElem;
    this.opponentNumCardsElem = HTMLElem;
    this.deck = new Deck().cardList;
    this.cardsInPlay = [];
    this.gameBoardMatrix = [];
    this.playerHandCoordinates = [];
    this.opponentHandCoordinates = [];
    this.cursorCoordinates = {}

    start()
    gameOver()

    updateGameNumCardsElements()
    
    // Handle player's shift
    swapPlayersShift()
    swapPlayerShiftElem(whichPlayerIsUp)
    
    // Handle cursor position on canvas
    drawCursorGameElem()
    removeCursorGameElem()
    updatePositionCursorGameElem()
    getCursorFileName()

    // Handle GameCard label element
    showGameCardLabelElem()
    removeGameCardLabelElem()
    updateGameCardLabelElem()

    // Prints all the cards from the player passed as parameter
    draftCardsToHand()
    removeCardsELems(player);

    chooseCardOnHand()

    // Change x & y from a card, pushes to cardsInPlay array and prints it.
    moveCardToGameBoard()

    // Creates a matrix with the coordinates of the gameboard
    fillGameBoardMatrix()
}
```
### player.js
```
Class Player(name, deck, canvas){
    this.name;
    this.deck;
    this.canvas;
    this.cardsInHand = [];
    this.numCards;

    // Count the total cards in hands and returns it.
    updateNumCards()

    // Get 5 random unique cards from deck.
    getRandomCards()

    // Remove the card passed as parameter from the player and returns it.
    removeCardFromHand(card)
}
```
### card.js
```
Class Card(deck, canvas, playerOwner){
    this.card;
    this.id;
    this.name;
    this.ranks = [TOP,LEFT,RIGHT,BOTTOM];
    this.backgroundColor
    this.imgSrc;
    this.positionOnBoard;
    this.playerOwner;
    this.canvas;
    this.ctx;
    this.x;
    this.y;
    this.size;

    // Used to manage setTiemout of drawImage()
    let drawImageTimeOut;

    // Prints the whole card at x,y coordinates. Background, image and ranks.
    drawImageCard(x, y)
    // Assist function. Used to get the filename of the card image.
    getFileName()

    // Get ranks from a card passed as parameter and pushes it at ranks[].
    loadCardRanks(card)

    // Get a random card from deck.
    getCard(deck)

    // Prints the card background.
    fillCardBackground()
    // Prints the ranks on card.
    drawRanksCard()
    // Assist function. Used to get the filename of the rank images
    getRankFileName()

    // Prints the back of a card.
    flipCard()
    // Assist function. Used to get the filename of the back of a card.
    getBackFileName()

    compareRank(rankToCompare)
}
```
### deck.js
```
Class Deck(){
    this.cardList = []
}
```


## States y States Transitions
```
- createSplashScreen()
    - createSplashScreen()
    - addEventListener(startGame)

- startGame()
    - create new Game()
    - game.start()

- gameOver()
    - createGameOverScreen()
    - addEventListener(startGame)
```


## Tasks
- Card - Define class properties
- Card - loadImage
- Card - getFileName
- Card - loadCardRanks
- Card - drawCard
- Card - fillCardBackground
- Card - flipCard
- Card - compareRank
- Player - Define class properties
- Player - updatePlayerNumCards
- Main - Define properties
- Main - createSplashScreen
- Main - removeSplashScreen
- Main - createGameScreen
- Main - removeGameScreen
- Main - createGameOverScreen
- Main - removeGameOverScreen
- Main - createHTMLElement
- Main - addEventListeners
- Game - Define class properties
- Game - start
- Game - gameOver
- Game - updateGameNumCardsElems
- Game - Handle CardName Element
- Game - Handle PlayerShift Element
- Game - Handle CursorGame Element
- Game - draftCardsToHand
- Game - chooseCardOnHand
- Game - moveCardToGameBoard
- Game - handleKeyDown


## Links


### Trello
[Link url](https://trello.com/b/IxegS0Ux/m1-triple-triad-ffviii)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/Silinde87/M1-Triple-Triad-FFVIII)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
