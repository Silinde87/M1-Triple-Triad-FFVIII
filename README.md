# M1-Triple-Triad-FFVIII

## Description
Game Card Triple Triad from Final Fantasy VIII replica. Each player starts with five cards and places one card for each turn on the board. The one with the highest rank converts the adjacent one.
The player with the most cards on the board wins the game.



## MVP (DOM - CANVAS)
Player vs player plays the card game with a keyboard.


## Backlog
- todo


## Data structure
### main.js
```
const game = new Game();
const splashScreen = HTMLElement;
const gameScreen = HTMLElement;
const gameOverScreen = HTMLElement;

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
```
### game.js
```
Class Game(gameScreen){
    this.canvas;
    this.ctx;
    this.gameScreen;
    this.player;
    this.gameIsOver = false;
    this.whichPlayerIsUp;
    this.playerNumCardsElem = HTMLElem;
    this.opponentNumCardsElem = HTMLElem;

    start(){        
    }

    gameOver(){        
    }

    updateGameNumCards(){        
    }
}
```
### player.js
```
Class Player(){
    this.cardsInHand = [];
    this.playerName;
    this.playerNumCards;
}
```
### card.js
```
Class Player(){
    this.idCard;
    this.cardName;
    this.rank = [TOP,LEFT,RIGHT,BOTTOM];
    this.imgSrc;
    this.positionOnBoard;
    this.playerOwner;

    loadImage(){        
    }
    getFileName(){        
    }
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


## Task
- Card - Define class properties
- Card - loadImage
- Card - getFileName
- Player - Define class properties
- Main - Define properties
- Main - createSplashScreen
- Main - removeSplashScreen
- Main - createGameScreen
- Main - removeGameScreen
- Main - createGameOverScreen
- Main - removeGameOverScreen
- Main - addEventListeners
- Game - Define class properties
- Game - start
- Game - gameOver
- Game - updateGameNumCards



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
