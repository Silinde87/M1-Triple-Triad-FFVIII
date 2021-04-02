class Game {
	constructor(gameScreen) {
		this.canvas = null;
		this.ctx = null;
		this.gameScreen = gameScreen;
		this.player = null;
		this.opponent = null;
		this.gameIsOver = false;
		this.wichPlayerIsUp = null;
		this.gameBoardMatrix = Array.from(Array(3), () => new Array(3));
		this.playerNumCardsElem;
		this.opponentNumCardsElem;
		this.deck = new Deck().cardList;
	}

	start() {
		//Number of cards elements
		this.playerNumCardsElem = this.gameScreen.querySelector("#player-num-cards");
		this.opponentNumCardsElem = this.gameScreen.querySelector("#opponent-num-cards");

		//Get and create the canvas and it's content
		this.canvas = this.gameScreen.querySelector("#game-canvas");
		this.ctx = this.canvas.getContext("2d");

		//Player creation
		this.player = new Player("player", this.deck, this.canvas);
		this.opponent = new Player("opponent", this.deck, this.canvas);
		this.wichPlayerIsUp = this.player.name;

		//TEST
		this.player.cardsInHand[1].drawImageCard();
	}
	gameOver() {}

	updateGameNumCardsElements(gameScreen) {}

	showPlayerShiftElem() {}
	removePlayerShiftelem() {}
	swapPlayerShiftElem() {}

	showCursorGameElem() {}
	removeCursorGameElem() {}
	updatePositionCursorGameElem() {}

	showGameCardLabelElem() {}
	removeGameCardLabelElem() {}
	updateGameCardLabelElem() {}

	draftCardsToHand() {}
	chooseCardOnHand() {}
	moveCardToGameBoard() {}

	handleKeydown() {}
}
