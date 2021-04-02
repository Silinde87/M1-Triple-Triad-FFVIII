let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let gameStatus = "initial"; //Allows switch the "return key" behaviour

// Splash screen
createSplashScreen = () => {
	splashScreen = createHtmlElement(
		"main",
		"splash-screen-container",
		["background"],
		`<div id="login-label" class="info-label">
            <img class="info-text"src="/assets/img/info-text.png" alt="info-label">
            <p>Do you want to play?</p>
            <ul>
                <li><img class="cursor" src="/assets/img/cursor.png" alt="cursor">Yes</li>
            </ul>
        </div>
    `
	);
	document.body.appendChild(splashScreen);
};
removeSplashScreen = () => splashScreen.remove();

// Game screen
createGameScreen = () => {
	gameStatus = "started";

	gameScreen = createHtmlElement(
		"main",
		"game-screen-container",
		["background"],
		`<div id="canvas-container">
            <canvas id="game-canvas"></canvas>
            <header>
                <div id="turn-game-selector">X</div>
            </header>
            <footer>
                <div id="opponent-num-cards">5</div>
                <div id="login-label" class="info-label">
                    <img class="info-text"src="/assets/img/info-text.png" alt="info-label">
                    <p id="card-game"></p>
                </div>
                <div id="player-num-cards">5</div>
            </footer>
        </div>            
    `
	);
	document.body.appendChild(gameScreen);
};
removeGameScreen = () => gameScreen.remove();

// Game Over screen
createGameOverScreen = (result) => {};
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
	createGameOverScreen(result);
};

window.addEventListener("load", createSplashScreen);

//Press Enter to continue
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		switch (gameStatus) {
			case "initial":
				startGame();
				break;
		}
	}
});
