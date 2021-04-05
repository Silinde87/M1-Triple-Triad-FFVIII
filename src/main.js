let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let gameStatus = "initial"; //Allows switch the "return key" behaviour

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
		<!--<audio src="assets/sounds/bgm.mp3" autoplay loop></audio>-->
    `
	);
	document.body.appendChild(gameScreen);
};
// Remove game
removeGameScreen = () => gameScreen.remove();

// GAME OVER SCREEN //
// Create game over
createGameOverScreen = (result) => {
	gameStatus = "ended";

	gameOverScreen = createHtmlElement(
		"main",
		"gameover-screen-container",
		["background"],
		`<div>
            <img id='result-label' src='assets/img/label-${result}.png' alt='result-label'>
            <div>Press ENTER to restart</div>
        </div>
		<!--<audio src="assets/sounds/victory-fanfare.mp3" autoplay></audio>-->
	`
	);
	document.body.appendChild(gameOverScreen);
};
// Remove game over
removeGameOverScreen = () => gameOverScreen.remove();

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

// Setting game state. start or game over
startGame = () => {
	removeSplashScreen();
	if (gameOverScreen) {
		removeGameOverScreen();
	}
	createGameScreen();
	game = new Game(gameScreen);
	game.start();
};

endGame = () => {
	removeGameScreen();
	createGameOverScreen("lose");
};

handleEnterKeyDown = () => {
	switch (gameStatus) {
		case "initial":
			startGame();
			break;
		case "choosingCard":
			// Testing removGameScreen and createGameOverScreen. Logic goes here
			endGame();
			break;
		case "placingCard":
	}
};

handleArrowKeyDown = (e) => {
	gameStatus = "placingCard"; //TEST. Remove this
	const cardSize = 220;

	setTimeout(() => {
		switch (gameStatus) {
			// ChoosingCard game status.
			case "choosingCard":
				const borders = [80, 190, 300, 410, 520];
				switch (e.key) {
					case "ArrowDown":
						let playerHand = game.player.cardsInHand.length;
						let opponentHand = game.opponent.cardsInHand.length;
						if (game.wichPlayerIsUp === "player") {
							borderBottom = borders[playerHand - 1];
						} else {
							borderBottom = borders[opponentHand - 1];
						}
						if (game.lastCursorY + 110 > borderBottom) return;
						game.updatePositionCursorGameElem(game.lastCursorX, game.lastCursorY + cardSize / 2);
						break;
					case "ArrowUp":
						if (game.lastCursorY - 110 < borders[0]) return; // Sets top border
						game.updatePositionCursorGameElem(game.lastCursorX, game.lastCursorY - cardSize / 2);
						break;
				}
				break;
			// PlacingCard game status
			case "placingCard":
				const bordersGameBoard = { top: 80, left: 412, right: 852, bottom: 548 };
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
	}, 101);
};

// EVENTS LISTENERS //
window.addEventListener("load", createSplashScreen);

//Press Enter to continue
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") handleEnterKeyDown();
	let arrowKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
	if (arrowKeys.includes(e.key)) handleArrowKeyDown(e);
	// Redrawing the cards in play after moving the cursor. not working.
	game.cardsInPlay.forEach((card) => card.drawImageCard(card.x, card.y)); 
});
