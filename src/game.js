class Game {
	constructor(gameScreen) {
		this.canvas = null;
		this.ctx = null;
		this.gameScreen = gameScreen;
		this.player = null;
		this.opponent = null;
		this.gameIsOver = false;
		this.whichPlayerIsUp = null;
		this.playerNumCardsElem;
		this.opponentNumCardsElem;
		this.deck = new Deck().cardList;
		this.cardsInPlay = new Array(9).fill(null);
		this.lastCursorX;
		this.lastCursorY;
		this.gameBoardMatrix = this.fillGameBoardMatrix();
		this.playerHandCoordinates = [
			{ x: 1070, y: 30 }, // First Card
			{ x: 1070, y: 130 }, // Second Card
			{ x: 1070, y: 230 }, // Third Card
			{ x: 1070, y: 330 }, // Fourth Card
			{ x: 1070, y: 430 }, // Fifth Card
		];
		this.opponentHandCoordinates = [
			{ x: 60, y: 30 }, // First Card
			{ x: 60, y: 130 }, // Second Card
			{ x: 60, y: 230 }, // Third Card
			{ x: 60, y: 330 }, // Fourth Card
			{ x: 60, y: 430 }, // Fifth Card
		];
		this.cursorCoordinates = {
			playersHand: { x: 1030, y: 80 },
			opponentsHand: { x: 20, y: 80 },
			gameboard: { x: this.gameBoardMatrix[1][1].x + 72, y: this.gameBoardMatrix[1][1].y + 88 },
		};
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
		this.whichPlayerIsUp = this.player;

		//Draft cards
		this.draftCardsToHand(this.player);
		this.draftCardsToHand(this.opponent);
		//Flip Opponent Cards for the first round
		this.opponent.cardsInHand.forEach((card) => card.flipCard());

		//Updating and showing card label element for first load.
		this.updateGameCardLabelElem(this.player.cardsInHand[0].cardName);
		this.showGameCardLabelElem();
	}
	gameOver() {}

	//Modify the quantity of cards of each player
	updateGameNumCardsElements() {
		let playerCards = 0;
		let opponentCards = 0;
		playerCards += this.player.updateNumCards();
		playerCards += this.cardsInPlay.filter((card) => card.playerOwner === "player").length;

		opponentCards += this.opponent.updateNumCards();
		opponentCards += this.cardsInPlay.filter((card) => card.playerOwner === "opponent").length;

		this.playerNumCardsElem.innerHTML = `<img src="assets/img/scores/${playerCards}.png" alt="Player Score">`;
		this.opponentNumCardsElem.innerHTML = `<img src="assets/img/scores/${opponentCards}.png" alt="Opponent Score">`;
	}

	//Move the Chocobo element and flips and shows the cards of each player
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

	// Shows all the cards from the player passed as parameter
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
		let width = 220;
		let height = 630;
		this.ctx.clearRect(x, y, width, height);
	}

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

	// Calculates all combination of card captures
	calculateResult(posAtt, cardAtt) {
		let cards = this.cardsInPlay;
		switch (posAtt) {
			case 0: // Attacker at first cell
				if(cards[1]) cardAtt.compareRank(cardAtt, cards[1], cardAtt.ranks, cards[1].ranks, posAtt, 1);
				if(cards[3]) cardAtt.compareRank(cardAtt, cards[3], cardAtt.ranks, cards[3].ranks, posAtt, 3);
				break;
			case 1: // Attacker at second cell
				if(cards[0]) cardAtt.compareRank(cardAtt, cards[0], cardAtt.ranks, cards[0].ranks, posAtt, 0);
				if(cards[4]) cardAtt.compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
				if(cards[2]) cardAtt.compareRank(cardAtt, cards[2], cardAtt.ranks, cards[2].ranks, posAtt, 2);
				break;
			case 2: // Attacker at third cell
				if(cards[1]) cardAtt.compareRank(cardAtt, cards[1], cardAtt.ranks, cards[1].ranks, posAtt, 1);
				if(cards[5]) cardAtt.compareRank(cardAtt, cards[5], cardAtt.ranks, cards[5].ranks, posAtt, 5);
				break;
			case 3: // Attacker at fourth cell
				if(cards[0]) cardAtt.compareRank(cardAtt, cards[0], cardAtt.ranks, cards[0].ranks, posAtt, 0);
				if(cards[4]) cardAtt.compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
				if(cards[6]) cardAtt.compareRank(cardAtt, cards[6], cardAtt.ranks, cards[6].ranks, posAtt, 6);
				break;
			case 4: // Attacker at fifth cell
				if(cards[1]) cardAtt.compareRank(cardAtt, cards[1], cardAtt.ranks, cards[1].ranks, posAtt, 1);
				if(cards[3]) cardAtt.compareRank(cardAtt, cards[3], cardAtt.ranks, cards[3].ranks, posAtt, 3);
				if(cards[5]) cardAtt.compareRank(cardAtt, cards[5], cardAtt.ranks, cards[5].ranks, posAtt, 5);
				if(cards[7]) cardAtt.compareRank(cardAtt, cards[7], cardAtt.ranks, cards[7].ranks, posAtt, 7);
				break;
			case 5: // Attacker at sixth cell
				if(cards[2]) cardAtt.compareRank(cardAtt, cards[2], cardAtt.ranks, cards[2].ranks, posAtt, 2);
				if(cards[4]) cardAtt.compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
				if(cards[8]) cardAtt.compareRank(cardAtt, cards[8], cardAtt.ranks, cards[8].ranks, posAtt, 8);
				break;
			case 6: // Attacker at seventh cell
				if(cards[3]) cardAtt.compareRank(cardAtt, cards[3], cardAtt.ranks, cards[3].ranks, posAtt, 3);
				if(cards[7]) cardAtt.compareRank(cardAtt, cards[7], cardAtt.ranks, cards[7].ranks, posAtt, 7);
				break;
			case 7: // Attacker at sixth cell
				if(cards[4]) cardAtt.compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
				if(cards[6]) cardAtt.compareRank(cardAtt, cards[6], cardAtt.ranks, cards[6].ranks, posAtt, 6);
				if(cards[8]) cardAtt.compareRank(cardAtt, cards[8], cardAtt.ranks, cards[8].ranks, posAtt, 8);
				break;
			case 8: // Attacker at seventh cell
				if(cards[5]) cardAtt.compareRank(cardAtt, cards[5], cardAtt.ranks, cards[5].ranks, posAtt, 5);
				if(cards[7]) cardAtt.compareRank(cardAtt, cards[7], cardAtt.ranks, cards[7].ranks, posAtt, 7);
				break;
		}
	}

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
}
