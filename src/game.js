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
		this.cardsInPlay = [];
	}
	playerHandCoordinates = [
		{ x: 1070, y: 30 }, // First Card
		{ x: 1070, y: 130 }, // Second Card
		{ x: 1070, y: 230 }, // Third Card
		{ x: 1070, y: 330 }, // Fourth Card
		{ x: 1070, y: 430 }, // Fifth Card
	];
	opponentHandCoordinates = [
		{ x: 60, y: 30 }, // First Card
		{ x: 60, y: 130 }, // Second Card
		{ x: 60, y: 230 }, // Third Card
		{ x: 60, y: 330 }, // Fourth Card
		{ x: 60, y: 430 }, // Fifth Card
	];


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

		//Draft cards
		this.draftCardsToHand(this.player);
		this.draftCardsToHand(this.opponent);
		//Flip Opponent Cards for the first round
		this.opponent.cardsInHand.forEach(card =>card.flipCard());

		
		/////////////////
		///// TESTS /////
		/////////////////
		//TEST HANDLE CARD NAME
		this.updateGameCardLabelElem(this.player.cardsInHand[1].cardName);
		//this.updateGameCardLabelElem(this.opponent.cardsInHand[1].cardName);
		this.removeGameCardLabelElem();
		//this.showGameCardLabelElem();

		//TEST UPDATE
		//this.player.cardsInHand.push(this.opponent.cardsInHand.pop());
		this.updateGameNumCardsElements();

		//TEST SWAP SHIFT ELEMENT
		//this.swapPlayersShift();
	}
	gameOver() {}

	//Modify the quantity of cards of each player
	updateGameNumCardsElements() {
		this.player.updateNumCards();
		this.playerNumCardsElem.innerHTML = `<img src="assets/img/scores/${this.player.numCards}.png" alt="Player Score">`;
		this.opponent.updateNumCards();
		this.opponentNumCardsElem.innerHTML = `<img src="assets/img/scores/${this.opponent.numCards}.png" alt="Opponent Score">`;
	}

	//Move the Chocobo element and flips and shows the cards of each player
	swapPlayersShift() {
		if (this.wichPlayerIsUp === this.player.name) {
			this.wichPlayerIsUp = this.opponent.name;
			this.player.cardsInHand.forEach(card =>card.flipCard());
			this.draftCardsToHand(this.opponent);
		} else {
			this.wichPlayerIsUp = this.player.name;
			this.opponent.cardsInHand.forEach(card =>card.flipCard());
			this.draftCardsToHand(this.player);
		}
		this.swapPlayerShiftElem(this.wichPlayerIsUp);
	}

	// Move the Chocobo Element
	swapPlayerShiftElem(wichPlayerIsUp) {
		const shiftElementContainer = this.gameScreen.querySelector("#turn-game-selector");
		const shiftElement = shiftElementContainer.querySelector("img");
		shiftElement.classList.toggle("player-turn");
		shiftElement.classList.toggle("opponent-turn");

		if (wichPlayerIsUp === "opponent") {
			//swap to opponent
			shiftElementContainer.style.justifyContent = "flex-start";
		} else {
			//swap to player
			shiftElementContainer.style.justifyContent = "flex-end";
		}
	}

	showCursorGameElem() {}
	removeCursorGameElem() {}
	updatePositionCursorGameElem() {}

	//Handle GameCard Label Element
	showGameCardLabelElem() {
		document.querySelector("#card-game-label").style.visibility = "visible";
	}
	removeGameCardLabelElem() {
		document.querySelector("#card-game-label").style.visibility = "hidden";
	}
	updateGameCardLabelElem(cardName) {
		this.gameScreen.querySelector("#card-game-name").innerHTML = cardName;
	}

	// Shows all the cards from the player passed as parameter
	draftCardsToHand(playerToDraft) {
		for (let i = 0; i < playerToDraft.cardsInHand.length; i++) {
			let x = this.playerHandCoordinates[i].x;
			let y = this.playerHandCoordinates[i].y;
			if (playerToDraft.name === "opponent") {
				x = this.opponentHandCoordinates[i].x;
				y = this.opponentHandCoordinates[i].y;
			}

			playerToDraft.cardsInHand[i].drawImageCard(x, y);
		}
	}

	chooseCardOnHand() {}
	moveCardToGameBoard() {}

	// Creates a matrix with the coordinates of the gameboard
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
