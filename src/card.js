class Card {
	constructor(deck, canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.card = this.getCard(deck);
		this.id = this.card.id;
		this.cardName = this.card.name;
		this.ranks = this.loadCardRanks(this.card);
		this.backgroundColor;
		this.imgSrc = this.getFileName();
		this.positionOnBoard;
		this.playerOwner;
		this.x;
		this.y;
	}
	drawImageCard() {
		const img = document.createElement('img');
		//Test image
		//img.src = this.getFileName();
		img.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
	
		this.ctx.drawImage(img, 30, 30, 50, 50);		
		this.ctx.fillRect(340,20, 220,220);
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
	fillCardBackground() {}
	flipCard() {}
	compareRank(rankToCompare) {}
}
