const TOP = 0;
const LEFT = 1;
const RIGHT = 2;
const BOTTOM = 3;

/**
 * Calculates all combination of card captures
 * @param {integer} posAtt - Position at gameboard of the attacker card (0-8).
 * @param {Card} cardAtt - Card attacker.
 * @param {array} cards - Cards placed at gameboard.
 */
calculateResult = (posAtt, cardAtt, cards) => {
	switch (posAtt) {
		case 0: // Attacker at first cell
			if (cards[1]) compareRank(cardAtt, cards[1], posAtt, 1);
			if (cards[3]) compareRank(cardAtt, cards[3], posAtt, 3);
			break;
		case 1: // Attacker at second cell
			if (cards[0]) compareRank(cardAtt, cards[0], posAtt, 0);
			if (cards[4]) compareRank(cardAtt, cards[4], posAtt, 4);
			if (cards[2]) compareRank(cardAtt, cards[2], posAtt, 2);
			break;
		case 2: // Attacker at third cell
			if (cards[1]) compareRank(cardAtt, cards[1], posAtt, 1);
			if (cards[5]) compareRank(cardAtt, cards[5], posAtt, 5);
			break;
		case 3: // Attacker at fourth cell
			if (cards[0]) compareRank(cardAtt, cards[0], posAtt, 0);
			if (cards[4]) compareRank(cardAtt, cards[4], posAtt, 4);
			if (cards[6]) compareRank(cardAtt, cards[6], posAtt, 6);
			break;
		case 4: // Attacker at fifth cell
			if (cards[1]) compareRank(cardAtt, cards[1], posAtt, 1);
			if (cards[3]) compareRank(cardAtt, cards[3], posAtt, 3);
			if (cards[5]) compareRank(cardAtt, cards[5], posAtt, 5);
			if (cards[7]) compareRank(cardAtt, cards[7], posAtt, 7);
			break;
		case 5: // Attacker at sixth cell
			if (cards[2]) compareRank(cardAtt, cards[2], posAtt, 2);
			if (cards[4]) compareRank(cardAtt, cards[4], posAtt, 4);
			if (cards[8]) compareRank(cardAtt, cards[8], posAtt, 8);
			break;
		case 6: // Attacker at seventh cell
			if (cards[3]) compareRank(cardAtt, cards[3], posAtt, 3);
			if (cards[7]) compareRank(cardAtt, cards[7], posAtt, 7);
			break;
		case 7: // Attacker at sixth cell
			if (cards[4]) compareRank(cardAtt, cards[4], posAtt, 4);
			if (cards[6]) compareRank(cardAtt, cards[6], posAtt, 6);
			if (cards[8]) compareRank(cardAtt, cards[8], posAtt, 8);
			break;
		case 8: // Attacker at seventh cell
			if (cards[5]) compareRank(cardAtt, cards[5], posAtt, 5);
			if (cards[7]) compareRank(cardAtt, cards[7], posAtt, 7);
			break;
	}
};

/**
 * Compare ranks of two correlative card.
 * @param {Card} cardAtt - Card attacker.
 * @param {Card} cardDef - Card defender.
 * @param {integer} posAtt - Position at gameboard of the attacker card (0-8).
 * @param {integer} posDef - Position at gameboard of the attacker card (0-8).
 */
compareRank = (cardAtt, cardDef, posAtt, posDef) => {
	const contender = {
		ranksAtt: cardAtt.ranks,
		ranksDef: cardDef.ranks,
		cardAtt: cardAtt,
		cardDef: cardDef,
	};
	if (cardDef === undefined) return; // Empty slot
	switch (posAtt) {
		case 0: // Attacker at first cell
			if (posDef === 1) captures(RIGHT, contender);
			else if (posDef === 3) captures(BOTTOM, contender);
			break;
		case 1: // Attacker at second cell
			if (posDef === 0) captures(LEFT, contender);
			else if (posDef === 4) captures(BOTTOM, contender);
			else if (posDef === 2) captures(RIGHT, contender);
			break;
		case 2: // Attacker at third cell
			if (posDef === 1) captures(LEFT, contender);
			else if (posDef === 5) captures(BOTTOM, contender);
			break;
		case 3: // Attacker at fourth cell
			if (posDef === 0) captures(TOP, contender);
			else if (posDef === 4) captures(RIGHT, contender);
			else if (posDef === 6) captures(BOTTOM, contender);
			break;
		case 4: // Attacker at fifth cell
			if (posDef === 1) captures(TOP, contender);
			else if (posDef === 3) captures(LEFT, contender);
			else if (posDef === 7) captures(BOTTOM, contender);
			else if (posDef === 5) captures(RIGHT, contender);
			break;
		case 5:
			if (posDef === 2) captures(TOP, contender);
			else if (posDef === 4) captures(LEFT, contender);
			else if (posDef === 8) captures(BOTTOM, contender);
			break;
		case 6:
			if (posDef === 3) captures(TOP, contender);
			else if (posDef === 7) captures(RIGHT, contender);
			break;
		case 7:
			if (posDef === 4) captures(TOP, contender);
			else if (posDef === 6) captures(LEFT, contender);
			else if (posDef === 8) captures(RIGHT, contender);
			break;
		case 8:
			if (posDef === 5) captures(TOP, contender);
			else if (posDef === 7) captures(LEFT, contender);
			break;
	}
};

/**
 * Determinate if a defender card is captured. True if rank attacker is greater.
 * @param {integer} rankAttacker - Rank of the attacker card.
 * @param {integer} rankDefender - Rank of the defender card.
 * @return {boolean} - The result of the capture.
 */
isCaptured = (rankAttacker, rankDefender) => {
	return rankAttacker > rankDefender;
};

/**
 * Captures the defender card, by changing his playerOwner.
 * @param {integer} direction - Direction of the capture. 0-Top, 1-Left, 2-Right, 3-Bottom
 * @param {object} cont - Contender. Simplified version of defender card.
 */
//
captures = (direction, cont) => {
	switch (direction) {
		// Defender at TOP
		case 0:
			if (isCaptured(cont.ranksAtt[TOP], cont.ranksDef[BOTTOM])){				
				if(cont.cardDef.playerOwner !== cont.cardAtt.playerOwner) sounds.playFlip()
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			}
			break;
		// Defender at LEFT
		case 1:
			if (isCaptured(cont.ranksAtt[LEFT], cont.ranksDef[RIGHT])){
				if(cont.cardDef.playerOwner !== cont.cardAtt.playerOwner) sounds.playFlip()
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			}
			break;
		// Defender at RIGHT
		case 2:
			if (isCaptured(cont.ranksAtt[RIGHT], cont.ranksDef[LEFT])){
				if(cont.cardDef.playerOwner !== cont.cardAtt.playerOwner) sounds.playFlip()
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			}
			break;
		// Defender at LEFT
		case 3:
			if (isCaptured(cont.ranksAtt[BOTTOM], cont.ranksDef[TOP])){
				if(cont.cardDef.playerOwner !== cont.cardAtt.playerOwner) sounds.playFlip()
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			}
			break;
	}
};
