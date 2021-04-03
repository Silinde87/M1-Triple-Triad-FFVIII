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
		//todo: IMPLEMENT GET POSITION
		this.x = 340;
		this.y = 20;
		this.size = 220;
	}
	drawImageCard() {
		const img = document.createElement("img");
		//Test image
		img.src = this.getFileName();

		img.onload = () => {
			this.fillCardBackground();
			this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
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

		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(this.x + 3, this.y + 3, this.size - 7, this.size - 7);
	}
	drawRanksCard() {}
	flipCard() {}
	compareRank(rankToCompare) {}
}
