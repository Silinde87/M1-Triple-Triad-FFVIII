class Card {
	constructor(deck, canvas, playerOwner) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.card = this.getCard(deck);
		this.id = this.card.id;
		this.cardName = this.card.name;
		this.ranks = this.loadCardRanks(this.card);
		this.backgroundColor;
		this.positionOnBoard;
		this.playerOwner = playerOwner;
		this.x;
		this.y;
		this.size = 220;
	}

	// Prints the whole card at x,y coordinates. Background and image
	updatePositionAndDrawImageCard(x, y) {
		this.x = x;
		this.y = y;
		const img = document.getElementById(`${this.id}`);
		this.fillCardBackground();
		this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
	}

	// Get ranks from a card passed as parameter and pushes it at ranks[].
	loadCardRanks(card) {
		const ranks = [];
		for (let i = 0; i < card.ranks.length; i++) {
			ranks.push(card.ranks[i]);
		}
		return ranks;
	}
	// Get a random card from deck.
	getCard(deck) {
		const index = Math.floor(Math.random() * deck.length);
		return deck[index];
	}

	// Prints the card background when called.
	fillCardBackground() {
		const gradientX1 = this.x + this.size / 2;
		const gradientY1 = this.y;
		const gradientX2 = this.x + this.size / 2;
		const gradientY2 = this.y + this.size;
		let gradient = this.ctx.createLinearGradient(gradientX1, gradientY1, gradientX2, gradientY2);
		gradient.addColorStop(0, "#ffffff"); // White

		if (this.playerOwner === "player") {
			gradient.addColorStop(1, "#2140ac"); // Blue
		} else {
			gradient.addColorStop(1, "#ec1b1b"); // Red
		}

		//Color and draw the background
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(this.x + 3, this.y + 3, this.size - 7, this.size - 7);
	}

	// Prints the ranks on card when called.
	drawRanksCard() {
		const extra = [
			{ x: 30, y: 15 }, // Top Rank
			{ x: 15, y: 40 }, // Left Rank
			{ x: 45, y: 40 }, // Right Rank
			{ x: 30, y: 65 }, // Bottom Rank
		];
		const rankSize = 25;
		for (let i = 0; i < 4; i++) {
			const x = this.x + extra[i].x;
			const y = this.y + extra[i].y;
			const imgRank = document.getElementById(`rank-${this.ranks[i]}`);
			this.ctx.drawImage(imgRank, x, y, rankSize, rankSize);
		}
	}

	// Prints the back of a card when called.
	flipCard() {
		const imgBack = document.getElementById(`card-back`);
		this.ctx.drawImage(imgBack, this.x, this.y, this.size, this.size);
	}

	compareRank(
		cardAttacker,
		cardDefender,
		ranksAttacker,
		ranksDefender,
		positionAttacker,
		positionDefender
	) {
		const contender = {
			ranksAtt: ranksAttacker,
			ranksDef: ranksDefender,
			cardAtt: cardAttacker,
			cardDef: cardDefender,
		};
		const top = 0;
		const left = 1;
		const right = 2;
		const bottom = 3;
		if (cardDefender === undefined) return; // Empty slot
		switch (positionAttacker) {
			case 0: // Attacker at first cell
				if (positionDefender === 1) this.captures(right, contender);
				else if (positionDefender === 3) this.captures(bottom, contender);
				break;
			case 1: // Attacker at second cell
				if (positionDefender === 0) this.captures(left, contender);
				else if (positionDefender === 4) this.captures(bottom, contender);
				else if (positionDefender === 2) this.captures(right, contender);
				break;
			case 2: // Attacker at third cell
				if (positionDefender === 1) this.captures(left, contender);
				else if (positionDefender === 5) this.captures(bottom, contender);
				break;
			case 3: // Attacker at fourth cell
				if (positionDefender === 0) this.captures(top, contender);
				else if (positionDefender === 4) this.captures(right, contender);
				else if (positionDefender === 6) this.captures(bottom, contender);
				break;
			case 4: // Attacker at fifth cell
				if (positionDefender === 1) this.captures(top, contender);
				else if (positionDefender === 3) this.captures(left, contender);
				else if (positionDefender === 7) this.captures(bottom, contender);
				else if (positionDefender === 5) this.captures(right, contender);
				break;
			case 5:
				if (positionDefender === 2) this.captures(top, contender);
				else if (positionDefender === 4) this.captures(left, contender);
				else if (positionDefender === 8) this.captures(bottom, contender);
				break;
			case 6:
				if (positionDefender === 3) this.captures(top, contender);
				else if (positionDefender === 7) this.captures(right, contender);
				break;
			case 7:
				if (positionDefender === 4) this.captures(top, contender);
				else if (positionDefender === 6) this.captures(left, contender);
				else if (positionDefender === 8) this.captures(right, contender);
				break;
			case 8:
				if (positionDefender === 5) this.captures(top, contender);
				else if (positionDefender === 7) this.captures(left, contender);
				break;
		}
	}
	isCaptured(rankAttacker, rankDefender) {
		return rankAttacker > rankDefender;
	}
	captures(direction, cont) {
		const top = 0;
		const left = 1;
		const right = 2;
		const bottom = 3;
		switch (direction) {
			// Defender at top
			case 0:
				if (this.isCaptured(cont.ranksAtt[top], cont.ranksDef[bottom]))
					cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
				break;
			// Defender at left
			case 1:
				if (this.isCaptured(cont.ranksAtt[left], cont.ranksDef[right]))
					cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
				break;
			// Defender at right
			case 2:
				if (this.isCaptured(cont.ranksAtt[right], cont.ranksDef[left]))
					cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
				break;
			// Defender at left
			case 3:
				if (this.isCaptured(cont.ranksAtt[bottom], cont.ranksDef[top]))
					cont.cardDef.playerOwner = cont.cardAtt.playerOwner;
				break;
		}
	}
}
