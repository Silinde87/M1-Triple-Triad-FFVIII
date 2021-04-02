class Card {
	constructor() {
		this.card = this.drawCard();
		this.id = this.card.id;
		this.cardName = this.card.name;
		this.ranks = this.loadCardRanks(this.card);
		this.backgroundColor;
		this.imgSrc;
		this.positionOnBoard;
		this.playerOwner;
	}
	loadImage() {}

	getFileName() {}

	loadCardRanks(card) {
		const ranks = [];
		for (let i = 0; i < card.ranks.length; i++) {
			ranks.push(card.ranks[i]);
		}
        return ranks;
	}
	drawCard() {
		const deck = new Deck();        
		const index = Math.floor(Math.random() * deck.deck.length);
		return deck.deck[index];
	}
	fillCardBackground() {}
	flipCard() {}
	compareRank(rankToCompare) {}
}
