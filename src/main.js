const game = new Game();
const splashScreen;
const gameScreen;
const gameOverScreen;

createSplashScreen = () => {};
removeSplashScreen = () => {};

creteGameScreen = () => {};
removeGameScreen = () => {};

createGameOverScreen = () => {};
removeGameOverScreen = () => {};

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
}
