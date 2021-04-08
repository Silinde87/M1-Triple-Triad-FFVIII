const cardSize = 220;

const playerCardsCoordinates = [
	{ x: 1070, y: 30 }, // First Card
	{ x: 1070, y: 130 }, // Second Card
	{ x: 1070, y: 230 }, // Third Card
	{ x: 1070, y: 330 }, // Fourth Card
	{ x: 1070, y: 430 }, // Fifth Card
];

const opponentCardsCoordinates = [
	{ x: 60, y: 30 }, // First Card
	{ x: 60, y: 130 }, // Second Card
	{ x: 60, y: 230 }, // Third Card
	{ x: 60, y: 330 }, // Fourth Card
	{ x: 60, y: 430 }, // Fifth Card
];

const boardMatrix = fillGameBoardMatrix();

const cursorCoord = {
	playersHand: { x: 1030, y: 80 },
	opponentsHand: { x: 20, y: 80 },
	gameboard: { x: boardMatrix[1][1].x + 72, y: boardMatrix[1][1].y + 88 },
};

const arrayToMatrixIndex = [
	{ i: 0, j: 0 },
	{ i: 0, j: 1 },
	{ i: 0, j: 2 },
	{ i: 1, j: 0 },
	{ i: 1, j: 1 },
	{ i: 1, j: 2 },
	{ i: 2, j: 0 },
	{ i: 2, j: 1 },
	{ i: 2, j: 2 }
];

/**
 * Creates a matrix with the coordinates of the gameboard
 * @return {array} - The 2D Array with the gameboard x & y values in objects.
 */
function fillGameBoardMatrix() {
	const initX = 340;
	const initY = 20;
	const matrix = [
		[
			{ x: initX, y: initY },
			{ x: initX + cardSize, y: initY },
			{ x: initX + cardSize * 2, y: initY },
		],
		[
			{ x: initX, y: initY + cardSize },
			{ x: initX + cardSize, y: initY + cardSize },
			{ x: initX + cardSize * 2, y: initY + cardSize },
		],
		[
			{ x: initX, y: initY + cardSize * 2 },
			{ x: initX + cardSize, y: initY + cardSize * 2 },
			{ x: initX + cardSize * 2, y: initY + cardSize * 2 },
		],
	];
	return matrix;
}
