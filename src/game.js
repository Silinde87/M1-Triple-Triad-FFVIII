class Game {
	constructor(gameScreen) {
		this.canvas = null;
		this.ctx = null;
		this.gameScreen = gameScreen;
		this.player = null;
		this.opponent = null;
		this.gameIsOver = false;
		this.wichPlayerIsUp = null;
		this.gameBoardMatrix = this.fillGameBoardMatrix();
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
		
		//Set canvas dimensions
		this.canvasContainer = this.gameScreen.querySelector("#canvas-container");
		this.containerWidth = this.canvasContainer.clientWidth;
		this.containerHeight = this.canvasContainer.clientHeight;
		this.canvas.setAttribute("width", this.containerWidth);
		this.canvas.setAttribute("height", this.containerHeight);


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

	fillGameBoardMatrix() {
		//todo: Sets the real initial x & y from canvas.
		//todo: Sets the real size card
		const initX = 0;
		const initY = 0;
		const size = 256;
		const matrix = [
			[
				{ x: initX, y: initY },
				{ x: initX + size, y: initY },
				{ x: initX + size * 2, y: initY },
			],
			[
				{ x: initX, y: initY + size },
				{ x: initX + size, y: initY + size },
				{ x: initX + size * 2, y: initY + size },
			],
			[
				{ x: initX, y: initY + size * 2 },
				{ x: initX + size, y: initY + size * 2 },
				{ x: initX + size * 2, y: initY + size * 2 },
			],
		];
		return matrix;
	}

	handleKeydown() {}
}
