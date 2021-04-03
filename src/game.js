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
		this.canvas.style.visibility = "visible";

		//Player creation
		this.player = new Player("player", this.deck, this.canvas);
		this.opponent = new Player("opponent", this.deck, this.canvas);
		this.wichPlayerIsUp = this.player.name;

		//TEST DRAW IMAGE
		this.player.cardsInHand[1].drawImageCard();

		//TEST UPDATE
		this.player.cardsInHand.push(this.opponent.cardsInHand.pop());
		this.updateGameNumCardsElements();
	}
	gameOver() {}

	updateGameNumCardsElements() {
		this.player.updateNumCards();
		this.playerNumCardsElem.innerHTML = `<img src="assets/img/scores/${this.player.numCards}.png" alt="Player Score">`;
		this.opponent.updateNumCards();
		this.opponentNumCardsElem.innerHTML = `<img src="assets/img/scores/${this.opponent.numCards}.png" alt="Opponent Score">`;
	}

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
		const initX = 340;
		const initY = 20;
		const size = 220;
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
