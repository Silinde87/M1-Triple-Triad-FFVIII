class Game {
	constructor(gameScreen) {
		this.gameScreen = gameScreen;
		this.playerNumCardsElem = this.gameScreen.querySelector("#player-num-cards");
		this.opponentNumCardsElem = this.gameScreen.querySelector("#opponent-num-cards");
		this.canvas = this.gameScreen.querySelector("#game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.deck = new Deck().cardList;
		this.player = new Player("player", this.deck, this.canvas);;
		this.opponent = new Player("opponent", this.deck, this.canvas);
		this.gameIsOver = false;
		this.whichPlayerIsUp = this.player;
		this.cardsInPlay = new Array(9).fill(null);
		this.lastCursorX;
		this.lastCursorY;
		this.gameBoardMatrix = boardMatrix;
		this.playerHandCoordinates = playerCardsCoordinates;
		this.opponentHandCoordinates = opponentCardsCoordinates;
		this.cursorCoordinates = cursorCoord;
	}

	start() {
		//Set canvas dimensions
		this.canvasContainer = this.gameScreen.querySelector("#canvas-container");
		this.containerWidth = this.canvasContainer.clientWidth;
		this.containerHeight = this.canvasContainer.clientHeight;
		this.canvas.setAttribute("width", this.containerWidth);
		this.canvas.setAttribute("height", this.containerHeight);
		this.canvas.style.visibility = "visible";

		//Draft cards
		this.draftCardsToHand(this.player);
		this.draftCardsToHand(this.opponent);
		//Flip Opponent Cards for the first round
		this.opponent.cardsInHand.forEach((card) => card.flipCard());

		//Updating and showing card label element for first load.
		this.updateGameCardLabelElem(this.player.cardsInHand[0].cardName);
		this.showGameCardLabelElem();
	}
	// Returns true if the cardsInPlay array is full. The game is ended
	isGameOver() {
		return this.cardsInPlay.filter((card) => card !== null).length === 9;
	}

	//Modify the quantity of cards of each player
	updateGameNumCardsElements() {
		let playerCards = this.countCardsOnGame(this.player);
		let opponentCards = this.countCardsOnGame(this.opponent);

		this.playerNumCardsElem.innerHTML = `<img src="assets/img/scores/${playerCards}.png" alt="Player Score">`;
		this.opponentNumCardsElem.innerHTML = `<img src="assets/img/scores/${opponentCards}.png" alt="Opponent Score">`;
	}

	// Count all cards from a player
	countCardsOnGame(player) {
		let num = 0;
		num += player.updateNumCards();
		num += this.cardsInPlay
			.filter((card) => card !== null)
			.filter((card) => card.playerOwner === player.name).length;

		return num;
	}

	//Call move the Chocobo element function and flips or shows the cards of each player
	swapPlayersShift() {
		if (this.whichPlayerIsUp.name === "player") {
			this.whichPlayerIsUp = this.opponent;
			this.player.cardsInHand.forEach((card) => card.flipCard());
			this.removeCardElements(this.opponent);
			this.draftCardsToHand(this.opponent);
			this.updatePositionCursorGameElem(
				this.cursorCoordinates.opponentsHand.x,
				this.cursorCoordinates.opponentsHand.y
			);
		} else {
			this.whichPlayerIsUp = this.player;
			this.opponent.cardsInHand.forEach((card) => card.flipCard());
			this.removeCardElements(this.player);
			this.draftCardsToHand(this.player);
			this.updatePositionCursorGameElem(
				this.cursorCoordinates.playersHand.x,
				this.cursorCoordinates.playersHand.y
			);
		}
		this.swapPlayerShiftElem(this.whichPlayerIsUp);
	}

	// Move the Chocobo Element
	swapPlayerShiftElem(whichPlayerIsUp) {
		const shiftElementContainer = this.gameScreen.querySelector("#turn-game-selector");
		const shiftElement = shiftElementContainer.querySelector("img");
		shiftElement.classList.toggle("player-turn");
		shiftElement.classList.toggle("opponent-turn");

		if (whichPlayerIsUp.name === "opponent") {
			//swap to opponent
			shiftElementContainer.style.justifyContent = "flex-start";
		} else {
			//swap to player
			shiftElementContainer.style.justifyContent = "flex-end";
		}
	}

	// Handle cursor position on canvas
	drawCursorGameElem() {
		const imgCursor = document.getElementById("cursor");
		this.ctx.drawImage(imgCursor, this.lastCursorX, this.lastCursorY, 38, 22);
	}
	removeCursorGameElem() {
		this.ctx.clearRect(this.lastCursorX, this.lastCursorY, 38, 22);
	}
	updatePositionCursorGameElem(x, y) {
		this.removeCursorGameElem();
		this.lastCursorX = x;
		this.lastCursorY = y;
		this.drawCursorGameElem();
	}

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

	// Prints all the cards from the player passed as parameter
	draftCardsToHand(playerToDraft) {
		for (let i = 0; i < playerToDraft.cardsInHand.length; i++) {
			let x = this.playerHandCoordinates[i].x;
			let y = this.playerHandCoordinates[i].y;
			if (playerToDraft.name === "opponent") {
				x = this.opponentHandCoordinates[i].x;
				y = this.opponentHandCoordinates[i].y;
			}

			playerToDraft.cardsInHand[i].updatePositionAndDrawImageCard(x, y);
			if (playerToDraft.name === this.whichPlayerIsUp.name) {
				playerToDraft.cardsInHand[i].drawRanksCard();
			}
		}
	}

	// Remove cards from canvas on player pased as parameter.
	removeCardElements(player) {
		let x, y;
		if (player.name === "player") {
			x = this.playerHandCoordinates[0].x;
			y = this.playerHandCoordinates[0].y;
		} else {
			x = this.opponentHandCoordinates[0].x;
			y = this.opponentHandCoordinates[0].y;
		}
		let width = cardSize;
		let height = 630;
		this.ctx.clearRect(x, y, width, height);
	}

	// Returns a card from hand's player based on y.
	chooseCardOnHand(player, y) {
		let selectedCard;
		switch (y) {
			case 80:
				selectedCard = player.cardsInHand[0];
				break;
			case 190:
				selectedCard = player.cardsInHand[1];
				break;
			case 300:
				selectedCard = player.cardsInHand[2];
				break;
			case 410:
				selectedCard = player.cardsInHand[3];
				break;
			case 520:
				selectedCard = player.cardsInHand[4];
				break;
		}
		return selectedCard;
	}

	// Change x & y from card passed as parameter
	// pushes it to cardsInPlay Array
	// Draws it at new x & y.
	moveCardToGameBoard(card, x, y) {
		card.x = x;
		card.y = y;
	}
	// Look for an x & y in a matrix and returns his position in 2d Array
	getPositionFromMatrixToArray(matrix, x, y) {
		let index = 0;
		for (let array of matrix) {
			for (let elem of array) {
				if (elem.x === x && elem.y === y) {
					return index;
				}
				index++;
			}
		}
	}
}
