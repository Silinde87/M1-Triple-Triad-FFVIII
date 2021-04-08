let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let gameStatus = "splash"; //Allows switch the "return key" behaviour
let gameMode;
let cardToMove;
const sounds = new Sounds();
const volumeButtons = document.querySelector("#volume-btns");
const volumeUp = document.querySelector(".fa-volume-up");
const volumeMute = document.querySelector(".fa-volume-mute");
let IATimeout = null;
let cursorPVP;
let cursorPVE;

/**
 * Creates the splash screen of the game
 */
createSplashScreen = () => {
	splashScreen = createHtmlElement(
		"main",
		"splash-screen-container",
		["background"],
		`<div id="login-label" class="info-label">
            <img class="info-text"src="assets/img/info-text.png" alt="info-label">
            <p>Choose game mode:</p>
            <ul>
                <li><img id="pvp" class="cursor" src="assets/img/cursor.png" alt="cursor"><p>Player vs Player</p></li>
				<li><img id="pve" class="cursor cursor-hide" src="assets/img/cursor.png" alt="cursor"><p>Player vs AI</p></li>
            </ul>
        </div>
    `
	);
	document.body.appendChild(splashScreen);
};

/**
 * Removes the splash screen of the game
 */
removeSplashScreen = () => splashScreen.remove();

/**
 * Creates game screen
 */
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

/**
 * Removes game screen
 */
removeGameScreen = () => gameScreen.remove();

/**
 * Creates game over screen
 * @param {string} result - The result of the game: win or draw.
 * @param {string} winner - The winner of the game: player or opponent.
 */
createGameOverScreen = (result, winner) => {
	debugger
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

	// Modifies game over screen when player lose in pve
	if(gameMode = 'pve' && result === "lose"){
		const resultGameOver = document.getElementById('result-gameover');
		resultGameOver.innerHTML = 'Wait, what happened? Press ENTER to start';
	}
	// Modifies game over screen when draw.
	if (result === "draw") {
		const resultGameOver = document.getElementById("result-gameover");
		resultGameOver.innerHTML = "Well done both of you! \nPress ENTER to start";
	}
};

/**
 * Removes game over screen
 */
removeGameOverScreen = () => gameOverScreen.remove();

/**
 * Preload the HTMLImageElement with all the cards in play
 */
createPreloadedCardsElement = () => {
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

/**
 * Creates DOM elements with many configuration optional parameters
 * @param {string} type - Type of the HTML Element.
 * @param {string} id - ID of the HTML Element. Can be null.
 * @param {array} arrayClasses - Class or classes of the HTML Element. Can be null.
 * @param {string} content - Content or children of the HTMLElement.
 * @return {HTMLElement} - The HTMLElement created.
 */
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

/**
 * Sets game state. Start Game.
 */
startGame = () => {
	if(!isMuted()) sounds.playBGM();
	cursorPVP = document.querySelector("#pvp");
	cursorPVE = document.querySelector("#pve");
	removeSplashScreen();
	splashScreen = undefined;

	createGameScreen();
	gameMode = getGameMode();
	game = new Game(gameScreen);
	game.start();

	game.updatePositionCursorGameElem(
		game.cursorCoordinates.playersHand.x,
		game.cursorCoordinates.playersHand.y
	);
};

/**
 * Sets game state. End game.
 */
endGame = (result, winner) => {
	if (!isMuted()) sounds.playFanfare();
	sounds.stopBGM();
	removeGameScreen();
	createGameOverScreen(result, winner);
};

/**
 * Gets the game mode.
 * @return {string} - Returns pvp or pve
 */
getGameMode = () => {
	if (cursorPVE.classList.contains("cursor-hide")) {
		return "pvp";
	} else {
		return "pve";
	}
};

/**
 * Check if sound music is muted.
 * @return {boolean}
 */
isMuted = () => {
	if (volumeUp.classList.contains("hide-sound") && !volumeMute.classList.contains("hide-sound")) {
		return true;
	} else {
		return false;
	}
};

/**
 * Handle ENTER keydown. Uses gameStatus to modify his functionality
 */
handleEnterKeyDown = () => {
	switch (gameStatus) {
		case "splash":
			if (gameOverScreen) {
				sounds.stopFanfare();
				removeGameOverScreen();
			}
			startGame();
			gameStatus = "choosingCard";
			break;
		case "initial":
			if (!splashScreen) {
				removeGameOverScreen();
				createSplashScreen();
				sounds.stopFanfare()
			}
			gameStatus = "splash";
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
			let index = game.getPositionFromMatrixToArray(game.gameBoardMatrix, cellX, cellY);

			// Exit condition if trying to place the card in occupied spot
			if (game.cardsInPlay[index]) {
				sounds.playInvalid();
				return;
			}
			sounds.playCard();
			// Calculate the fight between the cards and changes card's onwer if needed
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

			//PVE Mode, generate a random play.
			if (gameMode === "pve" && game.whichPlayerIsUp.name === "player" && !game.isGameOver()) {
				IATimeout = setTimeout(() => {
					game.generateAIPlay();
					sounds.card.play();
					game.cardsInPlay.forEach((card) => {
						if (card) {
							card.updatePositionAndDrawImageCard(card.x, card.y);
							card.drawRanksCard();
						}
					});
					game.updateGameNumCardsElements();
					IATimeout = null;
				}, 1000);
				game.lastCursorX = cursorCoord.playersHand.x;
				game.lastCursorY = cursorCoord.playersHand.y;
				game.drawCursorGameElem();
			} else {
				// PVP Mode, just swap players.
				game.swapPlayersShift();
			}

			//Updating game card label and showing it.
			game.updateGameCardLabelElem(game.whichPlayerIsUp.cardsInHand[0].cardName);
			game.showGameCardLabelElem();

			//Update the number of cards element of players.
			game.updateGameNumCardsElements();
			if (game.isGameOver()) {
				let playerCards = game.countCardsOnGame(game.player);
				let opponentCards = game.countCardsOnGame(game.opponent);

				//Player winds
				if (playerCards > opponentCards) endGame("win", "Player");
				// IA Wins in pve mode
				debugger
				if(playerCards < opponentCards && gameMode === 'pve') endGame('lose', 'Opponent');
				// Opponent wins
				if (playerCards < opponentCards && gameMode === 'pvp') endGame("win", "Opponent");
				// Draw
				if (playerCards == opponentCards) endGame("draw");

				gameStatus = "initial";
			} else {
				gameStatus = "choosingCard";
			}
			break;
	}
};

/**
 * Handle ARROWS keydown. Uses gameStatus to modify his functionality
 */
handleArrowKeyDown = (e) => {
	cursorPVP = document.querySelector("#pvp");
	cursorPVE = document.querySelector("#pve");
	switch (gameStatus) {
		// ChoosingCard game status.
		case "splash":
		case "initial":
			sounds.select.play();
			switch (e.key) {
				case "ArrowUp":
					cursorPVP.classList.remove("cursor-hide");
					cursorPVE.classList.add("cursor-hide");
					break;
				case "ArrowDown":
					cursorPVP.classList.add("cursor-hide");
					cursorPVE.classList.remove("cursor-hide");
					break;
			}
			break;
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

/**
 * Handle ESCAPE keydown. Returns to choosingCard status.
 */
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
	cursorPVP = document.querySelector("#pvp");
	cursorPVE = document.querySelector("#pve");
	createPreloadedCardsElement();
});

//Enter key listeners
window.addEventListener("keydown", (e) => {
	if (!IATimeout) {
		if (e.key === "Enter") handleEnterKeyDown();
	}
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

//Volumne buttons listeners
volumeButtons.addEventListener("click", () => {
	volumeUp.classList.toggle("hide-sound");
	volumeMute.classList.toggle("hide-sound");
	if (sounds.bgm.paused && gameStatus !== "initial") {
		sounds.playBGM();
	} else if (sounds.fanfare.paused && game.player.cardsInHand <= 1) {
		sounds.playFanfare();
	} else {
		sounds.stopBGM();
		sounds.stopFanfare();
	}
});
