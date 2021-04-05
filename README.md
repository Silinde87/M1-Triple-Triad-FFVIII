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

-   Define classes and objects
-   Implement Game Logic for player vs player
-   Create animations for card movements
-   Add music and sound effects
-   Implement Random IA for player vs IA
-   Implement realistic IA
-   Add mouse support

## Data structure

### main.js

```
const game = new Game();
const splashScreen = HTMLElement;
const gameScreen = HTMLElement;
const gameOverScreen = HTMLElement;
let gameStatus; // Allows switch the "return key" behaviour.
const cardSize = 220;
let cardToMove;

// Splash screen.
createSplashScreen()
removeSplashScreen()

// Game screen.
creteGameScreen()
removeGameScreen()

// Gameover Screen.
createGameOverScreen()
removeGameOverScreen()

// Preload the html elements with all the cards in play
createPreloadedCardsElement()

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
    this.whichPlayerIsUp = "";
    this.playerNumCardsElem = HTMLElem;
    this.opponentNumCardsElem = HTMLElem;
    this.deck = new Deck().cardList;
    this.cardsInPlay = [];
    this.lastCursorX;
    this.lastCursorY;
    this.gameBoardMatrix = [];
    this.playerHandCoordinates = [];
    this.opponentHandCoordinates = [];
    this.cursorCoordinates = {}

    start()
    gameOver()

    // Updates the num card elements counting each player's cards.
    updateGameNumCardsElements()

    // Handle player's shift
    swapPlayersShift()
    swapPlayerShiftElem(whichPlayerIsUp)

    // Handle cursor position on canvas
    drawCursorGameElem()
    removeCursorGameElem()
    updatePositionCursorGameElem()

    // Handle GameCard label element
    showGameCardLabelElem()
    removeGameCardLabelElem()
    updateGameCardLabelElem()

    // Prints all the cards from the player passed as parameter
    draftCardsToHand()
    // Remove cards from canvas on player pased as parameter.
    removeCardsElems(player);

    // Returns a card from hand's player based on y.
    chooseCardOnHand()

    // Change x & y from a card, pushes to cardsInPlay array and prints it.
    moveCardToGameBoard()
    // Look for an x & y in a matrix and returns his position in 2d Array
    getPositionFromMatrixToArray(matrix, x, y)

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
    this.canvas;
    this.ctx;
    this.card;
    this.id;
    this.cardName;
    this.ranks = [TOP,LEFT,RIGHT,BOTTOM];
    this.backgroundColor
    this.positionOnBoard;
    this.playerOwner;
    this.x;
    this.y;
    this.size;

    // Prints the whole card at x,y coordinates. Background, image and ranks.
    updatePositionAndDrawImageCard(x, y)

    // Get ranks from a card passed as parameter and pushes it at ranks[].
    loadCardRanks(card)

    // Get a random card from deck.
    getCard(deck)

    // Prints the card background.
    fillCardBackground()
    // Prints the ranks on card.
    drawRanksCard()

    // Prints the back of a card.
    flipCard()

    compareRank(rankToCompare)
    captures()
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

-   Card - Define class properties
-   Card - loadImage
-   Card - loadCardRanks
-   Card - drawCard
-   Card - fillCardBackground
-   Card - flipCard
-   Card - compareRank
-   Player - Define class properties
-   Player - updatePlayerNumCards
-   Main - Define properties
-   Main - createSplashScreen
-   Main - removeSplashScreen
-   Main - createGameScreen
-   Main - removeGameScreen
-   Main - createGameOverScreen
-   Main - removeGameOverScreen
-   Main - createHTMLElement
-   Main - addEventListeners
-   Game - Define class properties
-   Game - start
-   Game - gameOver
-   Game - updateGameNumCardsElems
-   Game - Handle CardName Element
-   Game - Handle PlayerShift Element
-   Game - Handle CursorGame Element
-   Game - draftCardsToHand
-   Game - chooseCardOnHand
-   Game - moveCardToGameBoard
-   Game - handleKeyDown

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
