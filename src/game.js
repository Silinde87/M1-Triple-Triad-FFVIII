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
