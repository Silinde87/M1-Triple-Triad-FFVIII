const TOP = 0;
const LEFT = 1;
const RIGHT = 2;
const BOTTOM = 3;

// Calculates all combination of card captures
calculateResult = (posAtt, cardAtt, cards) => {
	switch (posAtt) {
		case 0: // Attacker at first cell
			if (cards[1]) compareRank(cardAtt, cards[1], cardAtt.ranks, cards[1].ranks, posAtt, 1);
			if (cards[3]) compareRank(cardAtt, cards[3], cardAtt.ranks, cards[3].ranks, posAtt, 3);
			break;
		case 1: // Attacker at second cell
			if (cards[0]) compareRank(cardAtt, cards[0], cardAtt.ranks, cards[0].ranks, posAtt, 0);
			if (cards[4]) compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
			if (cards[2]) compareRank(cardAtt, cards[2], cardAtt.ranks, cards[2].ranks, posAtt, 2);
			break;
		case 2: // Attacker at third cell
			if (cards[1]) compareRank(cardAtt, cards[1], cardAtt.ranks, cards[1].ranks, posAtt, 1);
			if (cards[5]) compareRank(cardAtt, cards[5], cardAtt.ranks, cards[5].ranks, posAtt, 5);
			break;
		case 3: // Attacker at fourth cell
			if (cards[0]) compareRank(cardAtt, cards[0], cardAtt.ranks, cards[0].ranks, posAtt, 0);
			if (cards[4]) compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
			if (cards[6]) compareRank(cardAtt, cards[6], cardAtt.ranks, cards[6].ranks, posAtt, 6);
			break;
		case 4: // Attacker at fifth cell
			if (cards[1]) compareRank(cardAtt, cards[1], cardAtt.ranks, cards[1].ranks, posAtt, 1);
			if (cards[3]) compareRank(cardAtt, cards[3], cardAtt.ranks, cards[3].ranks, posAtt, 3);
			if (cards[5]) compareRank(cardAtt, cards[5], cardAtt.ranks, cards[5].ranks, posAtt, 5);
			if (cards[7]) compareRank(cardAtt, cards[7], cardAtt.ranks, cards[7].ranks, posAtt, 7);
			break;
		case 5: // Attacker at sixth cell
			if (cards[2]) compareRank(cardAtt, cards[2], cardAtt.ranks, cards[2].ranks, posAtt, 2);
			if (cards[4]) compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
			if (cards[8]) compareRank(cardAtt, cards[8], cardAtt.ranks, cards[8].ranks, posAtt, 8);
			break;
		case 6: // Attacker at seventh cell
			if (cards[3]) compareRank(cardAtt, cards[3], cardAtt.ranks, cards[3].ranks, posAtt, 3);
			if (cards[7]) compareRank(cardAtt, cards[7], cardAtt.ranks, cards[7].ranks, posAtt, 7);
			break;
		case 7: // Attacker at sixth cell
			if (cards[4]) compareRank(cardAtt, cards[4], cardAtt.ranks, cards[4].ranks, posAtt, 4);
			if (cards[6]) compareRank(cardAtt, cards[6], cardAtt.ranks, cards[6].ranks, posAtt, 6);
			if (cards[8]) compareRank(cardAtt, cards[8], cardAtt.ranks, cards[8].ranks, posAtt, 8);
			break;
		case 8: // Attacker at seventh cell
			if (cards[5]) compareRank(cardAtt, cards[5], cardAtt.ranks, cards[5].ranks, posAtt, 5);
			if (cards[7]) compareRank(cardAtt, cards[7], cardAtt.ranks, cards[7].ranks, posAtt, 7);
			break;
	}
};

compareRank = (cardAtt, cardDef, ranksAtt, ranksDef, posAtt, posDef) => {
	const contender = {
		ranksAtt: ranksAtt,
		ranksDef: ranksDef,
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
isCaptured = (rankAttacker, rankDefender) => {
	return rankAttacker > rankDefender;
};
captures = (direction, cont) => {
	switch (direction) {
		// Defender at TOP
		case 0:
			if (isCaptured(cont.ranksAtt[TOP], cont.ranksDef[BOTTOM]))
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			break;
		// Defender at LEFT
		case 1:
			if (isCaptured(cont.ranksAtt[LEFT], cont.ranksDef[RIGHT]))
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			break;
		// Defender at RIGHT
		case 2:
			if (isCaptured(cont.ranksAtt[RIGHT], cont.ranksDef[LEFT]))
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			break;
		// Defender at LEFT
		case 3:
			if (isCaptured(cont.ranksAtt[BOTTOM], cont.ranksDef[TOP]))
				cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
			break;
	}
};
