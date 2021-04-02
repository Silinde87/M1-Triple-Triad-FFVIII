# M1-Triple-Triad-FFVIII

## Description
Game Card Triple Triad from Final Fantasy VIII replica. Each player starts with five cards and places one card for each turn on the board. The one with the highest rank converts the adjacent one.
The player with the most cards on the board wins the game.



## MVP (DOM - CANVAS)
Player vs player plays the card game with a keyboard.
Without "hand cursor", just only changing card borders. With background solid color.
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
let gameStatus; //Allows switch the "return key" behaviour

createSplashScreen(){
}
removeSplashScreen(){    
}

creteGameScreen(){
}
removeGameScreen(){    
}

createGameOverScreen(){
}
removeGameOverScreen(){    
}

createHTMLElement(){    
}

startGame(){
}
endGame(){
}
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
    this.gameBoardMatrix = [];
    this.playerNumCardsElem = HTMLElem;
    this.opponentNumCardsElem = HTMLElem;

    start(){        
    }

    gameOver(){        
    }

    updateGameNumCardsElems(){        
    }

    showPlayerShiftElem(){
    }
    removePlayerShiftElem(){
    }
    swapPlayerShiftElem(){
    }

    showCursorGameElem(){
    }
    removeCursorGameElem(){
    }
    updatePositionCursorGameElem(){
    }

    showGameCardLabelElem(){
    }
    removeGameCardLabelElem(){
    }
    updateGameCardLabelElem(){
    }

    draftCardsToHand(){
    }
    chooseCardOnHand(){
    }
    moveCardToGameBoard(){
    }

    handleKeydown(){
    }
}
```
### player.js
```
Class Player(){
    this.cardsInHand = [];
    this.name;
    this.numCards;

    updateNumCards(){
    }
}
```
### card.js
```
Class Card(){
    this.id;
    this.name;
    this.rank = [TOP,LEFT,RIGHT,BOTTOM];
    this.backgroundColor
    this.imgSrc;
    this.positionOnBoard;
    this.playerOwner;

    loadImage(){        
    }
    getFileName(){        
    }

    loadCardRanks(){
    }

    drawCard(){
    }

    fillCardBackground(){
    }

    flipCard(){
    }

    compareRank(rankToCompare){
    }
}
```
### deck.js
```
Class Deck(){
    this.deck = []
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
