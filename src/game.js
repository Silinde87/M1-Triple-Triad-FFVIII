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
		//test player creation
		this.player = new Player("player", this.deck);
        this.opponent = new Player('opponent', this.deck)
        console.log(this.player);
        console.log(this.opponent);
	}
	gameOver() {}

	updateGameNumCardsElements() {}

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
