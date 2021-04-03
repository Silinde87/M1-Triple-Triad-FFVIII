class Card {
	constructor(deck, canvas, playerOwner) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.card = this.getCard(deck);
		this.id = this.card.id;
		this.cardName = this.card.name;
		this.ranks = this.loadCardRanks(this.card);
		this.backgroundColor;
		this.imgSrc = this.getFileName();
		this.positionOnBoard;
		this.playerOwner = playerOwner;
		this.x;
		this.y;
		this.size = 220;
	}
	drawImageCard(x, y) {
		this.x = x;
		this.y = y;
		const img = document.createElement("img");
		img.src = this.getFileName();

		//Draws complete card, with background and ranks.
		img.onload = () => {
			this.fillCardBackground();
			this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
			this.drawRanksCard();
		};
	}

	getFileName() {
		return "./../assets/img/cards/" + ("00" + this.id).slice(-3) + ".png";
	}

	loadCardRanks(card) {
		const ranks = [];
		for (let i = 0; i < card.ranks.length; i++) {
			ranks.push(card.ranks[i]);
		}
		return ranks;
	}
	getCard(deck) {
		const index = Math.floor(Math.random() * deck.length);
		return deck[index];
	}
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
			const imgRank = document.createElement("img");
			imgRank.src = this.getRankFileName(i);
			imgRank.onload = () => this.ctx.drawImage(imgRank, x, y, rankSize, rankSize);
		}
	}
	getRankFileName(index) {
		return "./../assets/img/ranks/" + ("" + this.ranks[index]).slice(-3) + ".png";
	}

	flipCard() {}
	compareRank(rankToCompare) {}
}
