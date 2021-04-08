# M1-Triple-Triad-FFVIII

## How it looks

🔗 [Live Demo](https://silinde87.github.io/M1-Triple-Triad-FFVIII/)

<a href="https://github.com/Silinde87/repo-media/blob/main/images/triple-triad-screen1.jpg?raw=true" target="_blank">
<img src="https://github.com/Silinde87/repo-media/blob/main/images/triple-triad-screen1.jpg?raw=true" width="405px" height="238px">
</a>


<a href="https://github.com/Silinde87/repo-media/blob/main/images/triple-triad-screen2.jpg?raw=true" target="_blank">
<img src="https://github.com/Silinde87/repo-media/blob/main/images/triple-triad-screen2.jpg?raw=true" width="397px" height="238px">
</a>

## Description

Game Card Triple Triad from Final Fantasy VIII replica. Each player starts with five cards and places one card for each turn on the board. The one with the highest rank converts the adjacent one.
The player with the most cards on the board wins the game.

## MVP (DOM - CANVAS)

Player vs player plays the card game with a keyboard.
Without animations. Card disappear from hand and appears at gameboard.

## Backlog

-   Create animations for card movements
-   Implement Random IA for player vs IA
-   Implement realistic IA
-   Add mouse support

## Data structure

### main.js

```
let game = new Game();
let splashScreen = HTMLElement;
let gameScreen = HTMLElement;
let gameOverScreen = HTMLElement;
let gameStatus; // Allows switch the "return key" behaviour.
let cardToMove;
const sounds = new Sounds();
const volumeButtons = HTMLElement;
const volumeUp = HTMLElement;
const volumeMute = HTMLElement;

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

// Creates DOM elements with many configuration optional parameters
createHTMLElement()

// Setting game state. Start Game.
startGame()
// Setting game state. End Game.
endGame()

// Handle ENTER keydown. Uses gameStatus to modify his functionality
handleEnterKeyDown()

// Handle ARROWS keydown. Uses gameStatus to modify his functionality
handleArrowKeyDown()

// Handle ESCAPE keydown. Returns to choosingCard status.
handleEscKeyDown()
```

### game.js

```
Class Game(gameScreen){
    this.gameScreen;    
    this.playerNumCardsElem = HTMLElem;
    this.opponentNumCardsElem = HTMLElem;
    this.canvas;
    this.ctx;
    this.deck = new Deck().cardList;
    this.player;
    this.opponent;
    this.gameIsOver = false;
    this.whichPlayerIsUp = "";
    this.cardsInPlay = [];
    this.lastCursorX;
    this.lastCursorY;    
    this.gameBoardMatrix = [];
    this.playerHandCoordinates = [];
    this.opponentHandCoordinates = [];
    this.cursorCoordinates = {}  

    // Initializes game
    start()
    // Returns true if the cardsInPlay array is full. The game is ended
    isGameOver()

    // Updates the num card elements counting each player's cards.
    updateGameNumCardsElements()
    // Count all cards from a player
    countCardsOnGame(player)

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
    chooseCardOnHand(player, y)

    // Change x & y from a card, pushes to cardsInPlay array and prints it.
    moveCardToGameBoard(card, x, y)
    // Look for an x & y in a matrix and returns his position in 2d Array
    getPositionFromMatrixToArray(matrix, x, y)
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

    // Assist function, checks for duplicated cards in an array. Looking for name.
    isDuplicated(array, card)

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
    this.backgroundColor;
    this.positionOnBoard;
    this.playerOwner;
    this.x;
    this.y;    this.size;

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
}
```
### initializers.js

```
const cardSize = 220;
const playerCardsCoordinates = [];
const opponentCardsCoordinate = [];
const boardMatrix = [][];
const cursorCoord = {}

// Creates a matrix with the coordinates of the gameboard
fillGameBoardMatrix()
```
### result.js

```
// Calculates all combination of card captures
calculateResult(positionAttacker, cardAttacker, cards);

// Compare two card ranks
compareRank(cardAtt, cardDef, ranksAtt, ranksDef, posAtt, posDef);

// Determinate if a defender card is captured. True if rank attacker is greater
isCaptured(rankAttacker, rankDefender);

// Captures the defender card
captures(direction, contender);

```
### sound.js

```
Class Sound(){
    this.flip = new Audio();
    this.card = new Audio();
    this.invalid = new Audio();
    this.select = new Audio();
    this.special = new Audio();
    this.bgm = new Audio();
    this.fanfare = new Audio();

    playFlip()
    playCard()
    playInvalid()
    playSelect()
    playSpecial()
    playBGM()
    stopBGM()
    playFanfare()
    stopFanfare()
}

```
### initializers.js

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


## Links

### Trello

[Link url](https://trello.com/b/IxegS0Ux/m1-triple-triad-ffviii)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/Silinde87/M1-Triple-Triad-FFVIII)
[Link Deploy](https://silinde87.github.io/M1-Triple-Triad-FFVIII/)

### Slides

URls for the project presentation
[Link Prezi.com](https://prezi.com/p/f6affqnog7gw/?present=1)
