let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let gameStatus = "initial"; //Allows switch the "return key" behaviour
const cardSize = 220;
let cardToMove;
let sounds = new Sounds();

// SPLASH SCREEN //
// Create splash
createSplashScreen = () => {
	splashScreen = createHtmlElement(
		"main",
		"splash-screen-container",
		["background"],
		`<div id="login-label" class="info-label">
            <img class="info-text"src="assets/img/info-text.png" alt="info-label">
            <p>Do you want to play?</p>
            <ul>
                <li><img class="cursor" src="assets/img/cursor.png" alt="cursor"><p>Yes</p></li>
            </ul>
        </div>
    `
	);
	document.body.appendChild(splashScreen);
};
// Remove Splash
removeSplashScreen = () => splashScreen.remove();

// GAME SCREEN //
// Create game
createGameScreen = () => {
	gameStatus = "choosingCard";

	gameScreen = createHtmlElement(
		"main",
		"game-screen-container",
		["background"],
		`<header>
			<div id="turn-game-selector">
				<img src="assets/img/chocobo.webp" alt="Chocobo turn selector" class="player-turn">
			</div>
		</header>
		<div id="canvas-container">
			<canvas id="game-canvas"></canvas>
		</div>    
		<footer>
			<div id="opponent-num-cards" class="num-card-label">
				<img src="assets/img/scores/5.png" alt="Opponent Score">
			</div>
			<div id="card-game-label" class="info-label">
			<img class="info-text"src="assets/img/info-text.png" alt="info-label">
			<p id="card-game-name">Sefirot</p>
			</div>
			<div id="player-num-cards" class="num-card-label">
				<img src="assets/img/scores/5.png" alt="Player Score">
			</div>
		</footer>
    `
	);
	document.body.appendChild(gameScreen);
};
// Remove game
removeGameScreen = () => gameScreen.remove();

// GAME OVER SCREEN //
// Create game over
createGameOverScreen = (result, winner) => {
	gameOverScreen = createHtmlElement(
		"main",
		"gameover-screen-container",
		["background"],
		`<div id="result">
            <img id='result-label' src='assets/img/label-${result}.png' alt='result-label'>
            <div id="result-gameover" class="info-label">Congratulations ${winner} Press ENTER to start</div>
        </div>
	`
	);
	document.body.appendChild(gameOverScreen);

	if (result === "draw") {
		const resultGameOver = document.getElementById("result-gameover");
		resultGameOver.innerHTML = "Well done both of you! \nPress ENTER to start";
	}
};
// Remove game over
removeGameOverScreen = () => gameOverScreen.remove();

// Preload the html elements with all the cards in play
createPreloadedCardsElement = (game) => {
	let deck = new Deck().cardList;

	const preloadedCardsElement = createHtmlElement("div", "preloaded-cards", null, null);

	// Preload card imgs
	deck.forEach((card) => {
		let img = document.createElement("img");
		img.src = "assets/img/cards/" + ("00" + card.id).slice(-3) + ".png";
		img.setAttribute("id", `${card.id}`);
		preloadedCardsElement.appendChild(img);
	});
	// Preload card back
	let img = document.createElement("img");
	img.src = "assets/img/card-back.png";
	img.setAttribute("id", "card-back");
	preloadedCardsElement.appendChild(img);

	// Preload cursor img
	img = document.createElement("img");
	img.src = "assets/img/cursor.png";
	img.setAttribute("id", "cursor");
	preloadedCardsElement.appendChild(img);

	// Preload ranks
	for (let i = 0; i < 11; i++) {
		let img = document.createElement("img");
		img.src = "assets/img/ranks/" + ("" + i).slice(-3) + ".png";
		img.setAttribute("id", `rank-${i}`);
		preloadedCardsElement.appendChild(img);
	}

	document.body.appendChild(preloadedCardsElement);
};

// Creates DOM elements with many configuration optional parameters
createHtmlElement = (type, id, arrayClasses, content) => {
	const element = document.createElement(type);
	if (id) element.id = id;
	if (arrayClasses) {
		arrayClasses.forEach((myClass) => element.classList.add(myClass));
	}
	if (content) {
		const tempElem = document.createElement("div");
		tempElem.innerHTML = content;

		if (tempElem.children.length === 0) {
			element.innerHTML = content;
		} else {
			[...tempElem.children].forEach((el) => element.appendChild(el));
		}
	}
	return element;
};

// Setting game state. Start Game.
startGame = () => {
	sounds.playBGM();
	removeSplashScreen();
	if (gameOverScreen) {
		sounds.stopFanfare();
		removeGameOverScreen();
	}
	createGameScreen();
	game = new Game(gameScreen);
	game.start();

	game.updatePositionCursorGameElem(
		game.cursorCoordinates.playersHand.x,
		game.cursorCoordinates.playersHand.y
	);
};

// Setting game state. End Game.
endGame = (result, winner) => {
	sounds.stopBGM();
	sounds.playFanfare();
	removeGameScreen();
	createGameOverScreen(result, winner);
};

// Handle ENTER keydown. Uses gameStatus to modify his functionality
handleEnterKeyDown = () => {
	switch (gameStatus) {
		case "initial":
			startGame();
			gameStatus = "choosingCard";
			break;
		case "choosingCard":
			// Choose a card from hand
			cardToMove = game.chooseCardOnHand(game.whichPlayerIsUp, game.lastCursorY);

			//Hide card name label elem
			game.removeGameCardLabelElem();
			let gameboardX = game.cursorCoordinates.gameboard.x;
			let gameboardY = game.cursorCoordinates.gameboard.y;
			// Move cursor to middle gameboard
			game.updatePositionCursorGameElem(gameboardX, gameboardY);
			sounds.playSelect();

			gameStatus = "placingCard";
			break;
		case "placingCard":
			let cellX = game.lastCursorX - 72;
			let cellY = game.lastCursorY - 88;
			// Exit condition if trying to place the card in occupied spot
			let index = game.getPositionFromMatrixToArray(game.gameBoardMatrix, cellX, cellY);
			if (game.cardsInPlay[index]) {
				sounds.playInvalid();
				return;
			}
			sounds.playCard();

			// Calculate the fight between the cards.
			calculateResult(index, cardToMove, game.cardsInPlay);

			// Move the card from the hand to the gameboard
			game.moveCardToGameBoard(cardToMove, cellX, cellY);
			// Add the card to the cardsInPlay Array.
			game.cardsInPlay.splice(index, 1, cardToMove);
			// Remove it from player card's array.
			game.whichPlayerIsUp.removeCardFromHand(cardToMove);
			// Erase player  card's elements
			game.removeCardElements(game.whichPlayerIsUp);
			// Draw again player card's element.
			game.draftCardsToHand(game.whichPlayerIsUp);

			// Swap players
			game.swapPlayersShift();

			//Updating game card label and showing it.
			game.updateGameCardLabelElem(game.whichPlayerIsUp.cardsInHand[0].cardName);
			game.showGameCardLabelElem();

			//Update the number of cards element of players.
			game.updateGameNumCardsElements();
			if (game.isGameOver()) {
				debugger
				let playerCards = game.countCardsOnGame(game.player);
				let opponentCards = game.countCardsOnGame(game.opponent);

				if (playerCards > opponentCards) endGame("win", "Player");
				if (playerCards < opponentCards) endGame("win", "Opponent");
				if (playerCards == opponentCards) endGame("draw");

				gameStatus = "initial";
			} else {
				gameStatus = "choosingCard";
			}
			break;
	}
};

// Handle ARROWS keydown. Uses gameStatus to modify his functionality
handleArrowKeyDown = (e) => {
	switch (gameStatus) {
		// ChoosingCard game status.
		case "choosingCard":
			const borders = [80, 190, 300, 410, 520];
			let index = borders.indexOf(game.lastCursorY);
			sounds.playSelect();
			switch (e.key) {
				case "ArrowDown":
					let playerHand = game.player.cardsInHand.length;
					let opponentHand = game.opponent.cardsInHand.length;
					if (game.whichPlayerIsUp.name === "player") {
						borderBottom = borders[playerHand - 1];
						if (game.lastCursorY + 110 > borderBottom) return;
						game.updateGameCardLabelElem(game.player.cardsInHand[index + 1].cardName);
					} else {
						borderBottom = borders[opponentHand - 1];
						if (game.lastCursorY + 110 > borderBottom) return;
						game.updateGameCardLabelElem(game.opponent.cardsInHand[index + 1].cardName);
					}
					game.updatePositionCursorGameElem(game.lastCursorX, game.lastCursorY + cardSize / 2);
					break;
				case "ArrowUp":
					if (game.lastCursorY - 110 < borders[0]) return; // Sets top border
					if (game.whichPlayerIsUp.name === "player") {
						game.updateGameCardLabelElem(game.player.cardsInHand[index - 1].cardName);
					} else {
						game.updateGameCardLabelElem(game.opponent.cardsInHand[index - 1].cardName);
					}
					game.updatePositionCursorGameElem(game.lastCursorX, game.lastCursorY - cardSize / 2);
					break;
			}
			break;
		// PlacingCard game status
		case "placingCard":
			const bordersGameBoard = { top: 80, left: 412, right: 852, bottom: 548 };
			sounds.playSelect();
			switch (e.key) {
				case "ArrowDown":
					if (game.lastCursorY + cardSize > bordersGameBoard.bottom) return; // Sets bottom border
					game.updatePositionCursorGameElem(game.lastCursorX, game.lastCursorY + cardSize);
					break;
				case "ArrowUp":
					if (game.lastCursorY - cardSize < bordersGameBoard.top) return; // Sets top border
					game.updatePositionCursorGameElem(game.lastCursorX, game.lastCursorY - cardSize);
					break;
				case "ArrowLeft":
					if (game.lastCursorX - cardSize < bordersGameBoard.left) return;
					game.updatePositionCursorGameElem(game.lastCursorX - cardSize, game.lastCursorY);
					break;
				case "ArrowRight":
					if (game.lastCursorX + cardSize > bordersGameBoard.right) return;
					game.updatePositionCursorGameElem(game.lastCursorX + cardSize, game.lastCursorY);
					break;
			}
			break;
	}
};

// Handle ESCAPE keydown. Returns to choosingCard status.
handleEscKeyDown = () => {
	gameStatus = "choosingCard";
	let handX;
	let handY;
	if (game.whichPlayerIsUp.name === "player") {
		handX = game.cursorCoordinates.playersHand.x;
		handY = game.cursorCoordinates.playersHand.y;
		game.updateGameCardLabelElem(game.player.cardsInHand[0].cardName);
	} else {
		handX = game.cursorCoordinates.opponentsHand.x;
		handY = game.cursorCoordinates.opponentsHand.y;
		game.updateGameCardLabelElem(game.opponent.cardsInHand[0].cardName);
	}
	game.updatePositionCursorGameElem(handX, handY);
	game.showGameCardLabelElem();
	sounds.playSelect();
};

// EVENTS LISTENERS //
window.addEventListener("load", () => {
	createSplashScreen();
	createPreloadedCardsElement();
});

//Press Enter to continue
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") handleEnterKeyDown();
	let arrowKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
	if (arrowKeys.includes(e.key)) handleArrowKeyDown(e);
	if (e.key === "Escape") handleEscKeyDown();
	// Redrawing the cards in play after moving the cursor.
	if (game) {
		game.cardsInPlay.forEach((card) => {
			if (card) {
				card.updatePositionAndDrawImageCard(card.x, card.y);
				card.drawRanksCard();
				game.drawCursorGameElem();
			}
		});
	}
});
