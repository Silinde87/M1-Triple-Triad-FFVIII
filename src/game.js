class Game {
	constructor() {
		this.canvas;
		this.ctx;
		this.gameScreen;
		this.player;
		this.opponent;
		this.gameIsOver = false;
		this.wichPlayerIsUp;
		this.gameBoardMatrix = Array.from(Array(3), () => new Array(3));
		this.playerNumCardsElem;
		this.opponentNumCardsElem;
		this.gameStatus; //allows switch "return key" behaviour
	}

	start() {}
	gameOver() {}

	updateGameNumCardsElements() {}

	showPlayerShiftElem() {}
    removePlayerShiftelem() {}
    swapPlayerShiftElem(){}

    showCursorGameElem(){}
    removeCursorGameElem(){}
    updatePositionCursorGameElem(){}

    showGameCardLabelElem(){}
    removeGameCardLabelElem(){}
    updateGameCardLabelElem(){}

    draftCardsToHand(){}
    chooseCardOnHand(){}
    moveCardToGameBoard(){}

    handleKeydown(){}
}
